import { combineReducers } from 'redux';
import {
  POST_UPLOAD_START,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  LIKE_POST,
  DISLIKE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  FETCH_POSTS_BY_USERNAME_START,
  FETCH_POSTS_BY_USERNAME_SUCCESS,
  FETCH_POSTS_BY_USERNAME_FAILURE,
  FETCH_POSTS_BY_LOCATION_SUCCESS,
  FETCH_POSTS_BY_LOCATION_FAILURE,
  FETCH_POSTS_BY_TAG_SUCCESS,
  FETCH_POSTS_BY_TAG_FAILURE,
  FETCH_MORE_COMMENTS_SUCCUESS,
  LIKE_POST_NOTIFICATION_RECEIVED,
  COMMENT_ON_POST_NOTIFICATION_RECEIVED,
} from '../actions/actionTypes';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  allIds: [],
  idsByPlaceId: {},
  idsByTagName: {},
  byId: {},
  isFetching: false,
  isUploading: false,
  pagination: {
    currentPage: null,
    nextPage: null,
    prevPage: null,
    totalPages: null,
    totalCount: null,
  },
  paginationsByTagName: {},
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
    case FETCH_POSTS_BY_USERNAME_SUCCESS:
      return action.payload.reduce((nextState, post) => {
        if (nextState.indexOf(post.id) === -1) {
          nextState.push(post.id);
        }
        return nextState;
      }, [...state]);
    case POST_UPLOAD_SUCCESS:
      return [action.payload.id, ...state];
    default:
      return state;
  }
}

const idsByPlaceId = (state = initialState.idsByPlaceId, action) => {
  switch (action.type) {
    case FETCH_POSTS_BY_LOCATION_SUCCESS:
      return {
        ...state,
        [action.placeId]: action.payload.map(post => post.id)
      }
    default:
      return state;
  }
}

const _idsByTagName = (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS_BY_TAG_SUCCESS:
      return action.payload.reduce((nextState, post) => {
        if (nextState.indexOf(post.id) === -1) {
          nextState.push(post.id);
        }
        return nextState;
      }, [...state]);
    default:
      return state;
  }
}

const idsByTagName = (state = initialState.idsByTagName, action) => {
  switch (action.type) {
    case FETCH_POSTS_BY_TAG_SUCCESS:
      return {
        ...state,
        [action.tagName]: _idsByTagName(state[action.tagName], action),
      }
    case LOCATION_CHANGE:
      return {};
    default:
      return state;
  }
}

const post = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST:
      return {
        ...state,
        likesCount: state.likesCount + 1,
      }
    case DISLIKE_POST:
      return {
        ...state,
        likesCount: state.likesCount - 1,
      }
    case ADD_COMMENT:
      return {
        ...state,
        commentsCount: state.commentsCount + 1,
        comments: [...state.comments, action.payload],
      }
    case DELETE_COMMENT:
      return {
        ...state,
        commentsCount: state.commentsCount - 1,
        comments: state.comments.filter(comment => comment.id !== action.commentId),
      }
    case FETCH_MORE_COMMENTS_SUCCUESS:
      return {
        ...state,
        comments: [...action.payload, ...state.comments],
        commentPagination: action.pagination,
      }
    case LIKE_POST_NOTIFICATION_RECEIVED:
      return {
        ...state,
        likesCount: action.likesCount,
      }
    case COMMENT_ON_POST_NOTIFICATION_RECEIVED:
      return {
        ...state,
        comments: [...state.comments, action.comment],
      }
    default:
      return state;
  }
}

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
    case FETCH_POSTS_BY_USERNAME_SUCCESS:
    case FETCH_POSTS_BY_LOCATION_SUCCESS:
    case FETCH_POSTS_BY_TAG_SUCCESS:
      return action.payload.reduce((nextState, post) => {
        nextState[post.id] = post;
        return nextState;
      }, {...state});
    case POST_UPLOAD_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case LIKE_POST:
    case DISLIKE_POST:
    case ADD_COMMENT:
    case DELETE_COMMENT:
    case FETCH_MORE_COMMENTS_SUCCUESS:
    case LIKE_POST_NOTIFICATION_RECEIVED:
    case COMMENT_ON_POST_NOTIFICATION_RECEIVED:
      return {
        ...state,
        [action.postId]: post(state[action.postId], action),
      }
    default:
      return state;
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case FETCH_POSTS_START:
    case FETCH_POSTS_BY_USERNAME_START:
      return true;
    case FETCH_POSTS_SUCCESS:
    case FETCH_POSTS_FAILURE:
    case FETCH_POSTS_BY_USERNAME_SUCCESS:
    case FETCH_POSTS_BY_USERNAME_FAILURE:
    case FETCH_POSTS_BY_LOCATION_SUCCESS:
    case FETCH_POSTS_BY_LOCATION_FAILURE:
    case FETCH_POSTS_BY_TAG_SUCCESS:
    case FETCH_POSTS_BY_TAG_FAILURE:
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

const pagination = (state = initialState.pagination, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return action.pagination;
    default:
      return state;
  }
}

const _tagsPagination = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS_BY_TAG_SUCCESS:
      return action.pagination;
    default:
      return state;
  }
}

const paginationsByTagName = (state = initialState.paginationsByTagName, action) => {
  switch (action.type) {
    case FETCH_POSTS_BY_TAG_SUCCESS:
      return {
        ...state,
        [action.tagName]: _tagsPagination(state[action.tagName], action),
      };
    case LOCATION_CHANGE:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  allIds,
  idsByPlaceId,
  idsByTagName,
  byId,
  isFetching,
  isUploading,
  pagination,
  paginationsByTagName,
});

/*** Selectors ***/
const sortComments = (posts) => {
  return posts.map(post => ({
    ...post,
    comments: post.comments.sort((a, b) => {
      return (new Date(a.createdAt) >= new Date(b.createdAt)) ? 1 : -1;
    })
  }));
}

export const getPostsByIds = (state, ids) => {
  const posts = ids.map(id => state.byId[id]);
  return sortComments(posts);
}

export const getAllPosts = (state) => {
  const { allIds, byId } = state;
  const posts = allIds.map(id => byId[id])
  return sortComments(posts);
}

export const getPostById = (state, id) => {
  return state.byId[id] || null;
}

export const getIsFetching = (state) => {
  return state.isFetching;
}

export const getIsUploading = (state) => state.isUploading;

export const getPostsByPlaceId = (state, placeId) => {
  const ids = state.idsByPlaceId[placeId];
  if (!ids) {
    return [];
  }

  const posts = ids.map(id => state.byId[id]);
  return sortComments(posts);
}

export const getPostsByTagName = (state, tagName) => {
  const ids = state.idsByTagName[tagName];
  if (!ids) {
    return [];
  }

  const posts = ids.map(id => state.byId[id]);
  return sortComments(posts);
}

export const getCurrentPage = (state) => state.pagination.currentPage;
export const getNextPage = (state) => state.pagination.nextPage;
export const getTotalPages = (state) => state.pagination.totalPages;

export const getPaginationByTagName = (state, tagName) => {
  return state.paginationsByTagName[tagName] || {}
}
