import {
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILURE,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILURE,
  USER_SIGN_OUT,
  PROFILE_UPDATE_SUCCESS,
  POST_UPLOAD_SUCCESS,
  LIKE_POST,
  DISLIKE_POST,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../actions/actionTypes';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  id: null,
  authenticationToken: null,
  postIds: [],
  likedPostIds: [],
  followerIds: [],
  followingIds: [],
  attributes: {},
  errors: {
    auth: [],
  },
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP_SUCCESS:
    case USER_SIGN_IN_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        authenticationToken: action.payload.authenticationToken,
        attributes: action.payload.attrs,
        postIds: action.payload.postIds,
        likedPostIds: action.payload.likedPostIds,
        followerIds: action.payload.followerIds,
        followingIds: action.payload.followingIds,
        errors: initialState.errors,
      };
    case USER_SIGN_UP_FAILURE:
    case USER_SIGN_IN_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          auth: action.errors,
        },
      }
    case POST_UPLOAD_SUCCESS:
      return {
        ...state,
        postIds: [...state.postIds, action.payload.id],
      }
    case LIKE_POST:
      return {
        ...state,
        likedPostIds: [...state.likedPostIds, action.postId],
      }
    case DISLIKE_POST:
      return {
        ...state,
        likedPostIds: state.likedPostIds.filter(id => id !== action.postId)
      }
    case FOLLOW_USER:
      return {
        ...state,
        followingIds: [...state.followingIds, action.userId],
      }
    case UNFOLLOW_USER:
      return {
        ...state,
        followingIds: state.followingIds.filter(id => id !== action.userId)
      }
    case USER_SIGN_OUT:
      return initialState;
    case LOCATION_CHANGE:
      return {
        ...state,
        errors: initialState.errors,
      }
    default:
      return state;
  }
};

/*** Selectors ***/
export const getCurrentUser = (state) => {
  return state.attributes;
};

export const getAuthToken = (state) => {
  return state.authenticationToken;
};

export const getPostIds = (state) => {
  return state.postIds;
};

export const getLikedPostIds = (state) => {
  return state.likedPostIds;
};

export const getFollowingIds = (state) => {
  return state.followingIds;
};

export const getAuthErrors = (state) => {
  return state.errors.auth;
}

export default currentUser;
