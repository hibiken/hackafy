import { combineReducers } from 'redux';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATION_COUNT,
  CLEAR_NOTIFICATIONS,
  TOUCH_NOTIFICATION,
  USER_SIGN_OUT
} from '../actions/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  count: 0,
  isFetching: false,
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return action.payload.map(notification => notification.id)
    case USER_SIGN_OUT:
      return [];
    default:
      return state;
  }
};

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
    case USER_SIGN_OUT:
      return {};
    case TOUCH_NOTIFICATION:
      return {
        ...state,
        [action.id]: _notification(state[action.id], action)
      };
    default:
      return state;
  }
};

const count = (state = initialState.count, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_COUNT:
      return action.count;
    case USER_SIGN_OUT:
    case CLEAR_NOTIFICATIONS:
      return 0;
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

const notifications = combineReducers({
  allIds,
  byId,
  count,
  isFetching,
});

export default notifications;

/*** Selectors ***/
export const getNotifications = (state) => {
  const { allIds, byId } = state;
  const sortedIds = allIds.sort((a, b) => a -b);
  return sortedIds.map(id => byId[id]);
};

export const getIsFetchingNotifications = (state) => state.isFetching;

export const getCount = (state) => state.count;
