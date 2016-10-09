import { combineReducers } from 'redux';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATION_COUNT,
  CLEAR_NOTIFICATIONS,
  TOUCH_NOTIFICATION,
  LIKE_POST_NOTIFICATION_RECEIVED,
  START_FOLLOWING_NOTIFICATION_RECEIVED,
  COMMENT_ON_POST_NOTIFICATION_RECEIVED,
  HIDE_NEW_NOTIFICATION,
} from '../actions/actionTypes';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  allIds: [],
  newIds: [],
  byId: {},
  count: 0,
  isFetching: false,
  pagination: {
    currentPage: null,
    nextPage: null,
    prevPage: null,
    totalPages: null,
    totalCount: null,
  },
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return action.payload.reduce((nextState, notification) => {
        if (nextState.indexOf(notification.id) === -1) {
          nextState.push(notification.id);
        }
        return nextState;
      }, [...state]);
    case LIKE_POST_NOTIFICATION_RECEIVED:
    case START_FOLLOWING_NOTIFICATION_RECEIVED:
    case COMMENT_ON_POST_NOTIFICATION_RECEIVED:
      return [...state, action.payload.id]
    default:
      return state;
  }
};

const newIds = (state = initialState.newIds, action) => {
  switch (action.type) {
    case LIKE_POST_NOTIFICATION_RECEIVED:
    case START_FOLLOWING_NOTIFICATION_RECEIVED:
    case COMMENT_ON_POST_NOTIFICATION_RECEIVED:
      return [...state, action.payload.id];
    case HIDE_NEW_NOTIFICATION:
      return state.filter(id => id !== action.id);
    case LOCATION_CHANGE:
      return [];
    default:
      return state;
  }
}

const _notification = (state = {}, action) => {
  switch (action.type) {
    case TOUCH_NOTIFICATION:
      return {
        ...state,
        readAt: Date.now(),
      };
    default:
      return state;
  }
}

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return action.payload.reduce((nextState, notification) => {
        nextState[notification.id] = notification;
        return nextState;
      }, {...state});
    case TOUCH_NOTIFICATION:
      return {
        ...state,
        [action.id]: _notification(state[action.id], action)
      };
    case LIKE_POST_NOTIFICATION_RECEIVED:
    case START_FOLLOWING_NOTIFICATION_RECEIVED:
    case COMMENT_ON_POST_NOTIFICATION_RECEIVED:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }
    default:
      return state;
  }
};

const count = (state = initialState.count, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_COUNT:
      return action.count;
    case CLEAR_NOTIFICATIONS:
      return 0;
    case LIKE_POST_NOTIFICATION_RECEIVED:
    case START_FOLLOWING_NOTIFICATION_RECEIVED:
    case COMMENT_ON_POST_NOTIFICATION_RECEIVED:
      return state + 1;
    default:
        return state;
  }
};

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
      return true;
    case FETCH_NOTIFICATIONS_SUCCESS:
    case FETCH_NOTIFICATIONS_FAILURE:
      return false;
    default:
      return state;
  }
};

const pagination = (state = initialState.pagination, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return action.pagination;
    default:
      return state;
  }
}

const notifications = combineReducers({
  allIds,
  newIds,
  byId,
  count,
  isFetching,
  pagination,
});

export default notifications;

/*** Selectors ***/
export const getNotifications = (state) => {
  const { allIds, byId } = state;
  const sortedIds = allIds.sort((a, b) => b -a);
  return sortedIds.map(id => byId[id]);
};

export const getNewNotifications = (state) => {
  const { newIds, byId } = state;
  return newIds
        .sort((a, b) => b - a)
        .map(id => byId[id]);
}

export const getIsFetchingNotifications = (state) => state.isFetching;

export const getCount = (state) => state.count;

export const getNextPage = (state) => state.pagination.nextPage;
export const getTotalPages = (state) => state.pagination.totalPages;
export const getCurrentPage = (state) => state.pagination.currentPage;
