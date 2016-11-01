import { combineReducers } from 'redux';
import {
  FETCH_PUBLIC_PROFILE_START,
  FETCH_PUBLIC_PROFILE_SUCCESS,
  FETCH_PUBLIC_PROFILE_FAILURE,
  FETCH_POSTS_BY_USERNAME_SUCCESS,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../actions/actionTypes'
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  allUsernames: [],
  byUsername: {},
  isFetching: false,
  errors: [],
};

const allUsernames = (state = initialState.allUsernames, action) => {
  switch (action.type) {
    case FETCH_PUBLIC_PROFILE_SUCCESS:
      if (state.indexOf(action.payload.username) === -1) {
        return [...state, action.payload.username];
      } else {
        return state;
      }
    default:
      return state;
  }
}

const _user = (state = {postIds: [], pagination: {}}, action) => {
  switch (action.type) {
    case FETCH_PUBLIC_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_POSTS_BY_USERNAME_SUCCESS:
      return {
        ...state,
        postIds: action.payload.reduce((nextState, post) => {
          if (nextState.indexOf(post.id) === -1) {
            nextState.push(post.id);
          }
          return nextState;
        }, [...state.postIds]),
        pagination: action.pagination,
      };
    case FOLLOW_USER:
      return {
        ...state,
        followersCount: state.followersCount + 1,
      }
    case UNFOLLOW_USER:
      return {
        ...state,
        followersCount: state.followersCount - 1,
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        pagination: {},
      }
    default:
      return state;
  }
}

const _currentUser = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        followingCount: state.followingCount + 1,
      }
    case UNFOLLOW_USER:
      return {
        ...state,
        followingCount: state.followingCount - 1,
      }
    default:
      return state;
  }
}

const byUsername = (state = initialState.byUsername, action) => {
  switch (action.type) {
    case FETCH_PUBLIC_PROFILE_SUCCESS:
      return {
        ...state,
        [action.username]: _user(state[action.username], action),
      }
    case FETCH_POSTS_BY_USERNAME_SUCCESS:
      return {
        ...state,
        [action.username]: _user(state[action.username], action),
      }
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      if (state[action.currentUserUsername]) {
        return {
          ...state,
          [action.username]: _user(state[action.username], action),
          [action.currentUserUsername]: _currentUser(state[action.currentUserUsername], action),
        }
      } else {
        return {
          ...state,
          [action.username]: _user(state[action.username], action),
        }
      }
    case LOCATION_CHANGE:
      const usernames = Object.keys(state);
      return usernames.reduce((nextState, username) => {
        nextState[username] = _user(nextState[username], action);
        return nextState;
      }, {...state});
    default:
      return state;
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case FETCH_PUBLIC_PROFILE_START:
      return true;
    case FETCH_PUBLIC_PROFILE_SUCCESS:
    case FETCH_PUBLIC_PROFILE_FAILURE:
      return false;
    default:
      return state;
  }
}

const errors = (state = initialState.errors, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return [];
    case FETCH_PUBLIC_PROFILE_FAILURE:
      return action.errors;
    default:
      return state;
  }
}

const publicProfiles = combineReducers({
  allUsernames,
  byUsername,
  isFetching,
  errors,
});

export default publicProfiles;

/*** Selectors ***/
export const getPostIdsByUsername = (state, username) => {
  const user = state.byUsername[username];
  if (user) {
    return user.postIds.sort((a, b) => b - a) || [];
  } else {
    return [];
  }
}

export const getPublicProfileByUsername = (state, username) => {
  const user = state.byUsername[username];
  return user || false;
}

export const getIsFetchingPublicProfile = (state) => state.isFetching;
export const getErrors = (state) => state.errors;

export const getPaginationByUsername = (state, username) => {
  const user = getPublicProfileByUsername(state, username);
  if (!user) { return {}; }
  return user.pagination;
}
