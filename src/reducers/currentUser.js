import {
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  PROFILE_UPDATE_SUCCESS,
  POST_UPLOAD_SUCCESS,
  LIKE_POST,
  DISLIKE_POST
} from '../actions/actionTypes';

const initialState = {
  id: null,
  authenticationToken: null,
  postIds: [],
  likedPostIds: [],
  attributes: {},
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
      };
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
    case USER_SIGN_OUT:
      return initialState;
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
}

export default currentUser;
