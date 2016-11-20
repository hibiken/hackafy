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
  followingPaginationsByUsername: {},
  followerPaginationsByUsername: {},
  isFetching: false,
};

const _userIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_FOLLOWING_SUCCESS:
    case FETCH_FOLLOWERS_SUCCESS:
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

/* Array of follower ids indexed by username

Example :
{
  "kenhibino": [2, 3, 45, 56, 67],
  "hansolo": [3, 4, 5, 67, 89, 345],
  "lukusky": [3, 4, 6, 7, 8, 89]
}
*/
const followerIdsByUsername = (state = initialState.followerIdsByUsername, action) => {
  switch (action.type) {
    case FETCH_FOLLOWERS_SUCCESS:
      return {
        ...state,
        [action.username]: _userIds(state[action.username], action),
      };
    default:
      return state;
  }
}

/* Array of following ids indexed by username

Example :
{
  "kenhibino": [2, 3, 45, 56, 67],
  "hansolo": [3, 4, 5, 67, 89, 345],
  "lukusky": [3, 4, 6, 7, 8, 89]
}
*/

const followingIdsByUsername = (state = initialState.followingIdsByUsername, action) => {
  switch (action.type) {
    case FETCH_FOLLOWING_SUCCESS:
      return {
        ...state,
        [action.username]: _userIds(state[action.username], action),
      }
    default:
      return state;
  }
}

/* key-value pairs where key is id, and value is following/follower data

Example:
{
  3: {
    id: 3,
    username: "cooldude",
    avatarUrl: "https://avatar.jpg",
  },
  4: {
    id: 4,
    username: "js-ninja",
    avatarUrl: "https://js-ninja.avatar.jpg",
  },
  ...
}
*/
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

/* pagination for following  indexed by username

Example :
{
  "kenhibino": {
    currentPage: 1,
    nextPage: 2,
    prevPage: null,
    totalPages: 2,
    totalCount: 10,
  },
  "hansolo": {
    currentPage: 2,
    nextPage: 3,
    prevPage: 1,
    totalPages: 5,
    totalCount: 100,
  }
}
*/

const followingPaginationsByUsername = (state = initialState.followingPaginationsByUsername, action) => {
  switch (action.type) {
    case FETCH_FOLLOWING_SUCCESS:
      return {
        ...state,
        [action.username]: action.pagination,
      }
    default:
      return state;
  }
}

const followerPaginationsByUsername = (state = initialState.followerPaginationsByUsername, action) => {
  switch (action.type) {
    case FETCH_FOLLOWERS_SUCCESS:
      return {
        ...state,
        [action.username]: action.pagination,
      }
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
  followingPaginationsByUsername,
  followerPaginationsByUsername,
  isFetching,
});

export default followersFollowing;

/*** Selectors ***/
const getFollowerIds = (state, username) => {
  const followerIds = state.followerIdsByUsername[username];
  if (!followerIds) {
    return [];
  } else {
    return followerIds;
  }
};

const getFollowingIds = (state, username) => {
  const followingIds = state.followingIdsByUsername[username];
  if (!followingIds) {
    return [];
  } else {
    return followingIds;
  }
};

export const getFollowersByUsername = (state, username) => {
  const followerIds = getFollowerIds(state, username);
  return followerIds.map(id => state.usersById[id]);
};

export const getFollowingByUsername = (state, username) => {
  const followingIds = getFollowingIds(state, username);
  return followingIds.map(id => state.usersById[id]);
};

const defaultPagination = {
  currentPage: null,
  nextPage: null,
  prevPage: null,
  totalPages: null,
  totalCount: null,
}

export const getFollowingPaginationByUsername = (state, username) => {
  return state.followingPaginationsByUsername[username] || defaultPagination;
};

export const getFollowerPaginationByUsername = (state, username) => {
  return state.followerPaginationsByUsername[username] || defaultPagination;
};

export const getFollowingNextPageByUsername = (state, username) => {
  const pagination = state.followingPaginationsByUsername[username];
  if (pagination) {
    return pagination.nextPage;
  } else {
    return null;
  }
}

export const getFollowerNextPageByUsername = (state, username) => {
  const pagination = state.followerPaginationsByUsername[username];
  if (pagination) {
    return pagination.nextPage;
  } else {
    return null;
  }
}

export const getIsFetching = (state) => state.isFetching;
