import { combineReducers } from 'redux';
import {
  FETCH_FOLLOW_SUGGESTIONS_START,
  FETCH_FOLLOW_SUGGESTIONS_SUCCESS,
  FETCH_FOLLOW_SUGGESTIONS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
}

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case FETCH_FOLLOW_SUGGESTIONS_SUCCESS:
      return action.payload.map(user => user.id);
    default:
      return state;
  }
}

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case FETCH_FOLLOW_SUGGESTIONS_SUCCESS:
      return action.payload.reduce((nextState, user) => {
        nextState[user.id] = user;
        return nextState;
      }, {})
    default:
      return state;
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case FETCH_FOLLOW_SUGGESTIONS_START:
      return true;
    case FETCH_FOLLOW_SUGGESTIONS_SUCCESS:
    case FETCH_FOLLOW_SUGGESTIONS_FAILURE:
      return false;
    default:
      return state;
  }
}

const followSuggestions = combineReducers({
  allIds,
  byId,
  isFetching,
});

export default followSuggestions;

export const getAllSuggestions = (state) => {
  const { allIds, byId } = state;
  return allIds.map(id => byId[id]);
}

export const getIsFetching = (state) => state.isFetching;
