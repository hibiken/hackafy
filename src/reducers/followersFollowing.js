import {
  FETCH_FOLLOWERS_START,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE,
  FETCH_FOLLOWING_START,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAILURE
} from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
  followerIdsByUsername: {},
  followingIdsByUsername: {},
  usersById: {},
  isFetching: false,
};

const followerIdsByUsername = (state = initialState.followerIdsByUsername, action) => {
  switch (action.type) {
    case FETCH_FOLLOWERS_SUCCESS:
      return {
        ...state,
        [action.username]: action.payload.map(user => user.id)
      };
    default:
      return state;
  }
}

const followingIdsByUsername = (state = initialState.followingIdsByUsername, action) => {
  switch (action.type) {
    case FETCH_FOLLOWING_SUCCESS:
      return {
        ...state,
        [action.username]: action.payload.map(user => user.id)
      }
    default:
      return state;
  }
}

const usersById = (state = initialState.usersById, action) => {
  switch (action.type) {
    case FETCH_FOLLOWERS_SUCCESS:
    case FETCH_FOLLOWING_SUCCESS:
      return action.payload.reduce((nextState, user) => {
        nextState[user.id] = user;
        return nextState;
      }, {...state});
    default:
      return state;
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case FETCH_FOLLOWERS_START:
    case FETCH_FOLLOWING_START:
      return true;
    case FETCH_FOLLOWERS_SUCCESS:
    case FETCH_FOLLOWERS_FAILURE:
    case FETCH_FOLLOWING_SUCCESS:
    case FETCH_FOLLOWING_FAILURE:
      return false;
    default:
      return state;
  }
}

const followersFollowing = combineReducers({
  followerIdsByUsername,
  followingIdsByUsername,
  usersById,
  isFetching,
});

export default followersFollowing;
