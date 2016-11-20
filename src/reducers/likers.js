import * as actionTypes from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
  likerIdsByPostId: {},
  likersById: {},
  isFetching: false,
  likerPaginationByPostId: {},
};


const _likerIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIKERS_SUCCESS:
      return action.payload.reduce((ids, user) => {
        if (ids.indexOf(user.id) === -1) {
          ids = [...ids, user.id];
        }
        return ids;
      }, state)
    default:
      return state;
  }
}

const likerIdsByPostId = (state = initialState.likerIdsByPostId, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIKERS_SUCCESS:
      return {
        ...state,
        [action.postId]: _likerIds(state[action.postId], action),
      }
    default:
      return state;
  }
}

const likersById = (state = initialState.likersById, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIKERS_SUCCESS:
      return action.payload.reduce((nextState, user) => {
        nextState[user.id] = user;
        return nextState;
      }, {...state})
    default:
      return state;
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIKERS_START:
      return true;
    case actionTypes.FETCH_LIKERS_SUCCESS:
    case actionTypes.FETCH_LIKERS_FAILURE:
      return false;
    default:
      return state;
  }
}

const likerPaginationByPostId = (state = initialState.likerPaginationByPostId, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIKERS_SUCCESS:
      return {
        ...state,
        [action.postId]: action.pagination,
      }
    default:
      return state;
  }
}

const likers = combineReducers({
  likerIdsByPostId,
  likersById,
  isFetching,
  likerPaginationByPostId,
});

export default likers;

/*** Selectors ***/
const getLikerIds = (state, postId) => {
  const likerIds = state.likerIdsByPostId[postId];
  if (!likerIds) {
    return [];
  } else {
    return likerIds;
  }
};

export const getLikersByPostId = (state, postId) => {
  const likerIds = getLikerIds(state, postId);
  return likerIds.map(id => state.likersById[id]);
};

const defaultPagination = {
  currentPage: null,
  nextPage: null,
  prevPage: null,
  totalPages: null,
  totalCount: null,
};

export const getLikerPaginationByPostId = (state, postId) => {
  return state.likerPaginationByPostId[postId] || defaultPagination;
}

export const getIsFetching = (state) => state.isFetching;
