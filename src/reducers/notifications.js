import { combineReducers } from 'redux';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  USER_SIGN_OUT
} from '../actions/actionTypes';

const initialState = {
  allIds: [],
  byId: {},
  unreadCount: 0,
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

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return action.payload.reduce((nextState, notification) => {
        nextState[notification.id] = notification;
        return notification;
      }, {...state});
    case USER_SIGN_OUT:
      return {};
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
  isFetching,
});

export default notifications;

/*** Selectors ***/
export const getNotifications = (state) => {
  const { allIds, byId } = state;
  return allIds.map(id => byId);
};
