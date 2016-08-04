import { combineReducers } from 'redux';
import {
  POST_UPLOAD_START,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILURE,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_UP_SUCCESS,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../actions/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
  isUploading: false,
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return action.payload.map(post => post.id);
    case USER_SIGN_IN_SUCCESS:
    case USER_SIGN_UP_SUCCESS:
      return [...state, ...action.payload.postIds];
    case POST_UPLOAD_SUCCESS:
      return [...state, action.payload.id];
    default:
      return state;
  }
}

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return action.payload.reduce((nextState, post) => {
        nextState[post.id] = post;
        return nextState;
      }, {});
    case USER_SIGN_IN_SUCCESS:
    case USER_SIGN_UP_SUCCESS:
      return action.payload.posts.reduce((nextState, post) => {
        nextState[post.id] = post;
        return nextState;
      }, {...state});
    case POST_UPLOAD_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case FETCH_POSTS_START:
      return true;
    case FETCH_POSTS_SUCCESS:
    case FETCH_POSTS_FAILURE:
      return false;
    default:
      return state;
  }
}

const isUploading = (state = initialState.isUploading, action) => {
  switch (action.type) {
    case POST_UPLOAD_START:
      return true;
    case POST_UPLOAD_SUCCESS:
    case POST_UPLOAD_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  allIds,
  byId,
  isFetching,
  isUploading,
});

/*** Selectors ***/
export const getPostsByIds = (state, ids) => {
  return ids.map(id => state.byId[id]);
}

export const getAllPosts = (state) => {
  const { allIds, byId } = state;
  return allIds.map(id => byId[id]);
}

export const getIsFetching = (state) => {
  return state.isFetching;
}
