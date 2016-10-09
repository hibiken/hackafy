import axios from 'axios';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATION_COUNT,
  CLEAR_NOTIFICATIONS,
  TOUCH_NOTIFICATION,
  HIDE_NEW_NOTIFICATION,
} from '../actionTypes';
import { getAuthToken, getNotificationsNextPage } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';

export const fetchNotifcations = () => (dispatch, getState) => {
  dispatch({type: FETCH_NOTIFICATIONS_START});

  const state = getState();
  const authToken = getAuthToken(state);
  const nextPage = getNotificationsNextPage(state);
  const url = (nextPage === null) ?
              `${API_URL}/users/notifications` :
              `${API_URL}/users/notifications?page=${nextPage}`

  return axios({
    method: 'get',
    url,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched notifications', data);
    dispatch({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      payload: data.notifications,
      pagination: data.meta,
    });
  }, (error) => {
    console.log('fetch notifications failed', error);
    dispatch({
      type: FETCH_NOTIFICATIONS_FAILURE,
    });
  });
};

export const fetchNotificationCount = () => (dispatch, getState) => {
  const authToken = getAuthToken(getState());

  return axios({
    method: 'get',
    url: `${API_URL}/users/notification_counts`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched count', data);
    dispatch({
      type: FETCH_NOTIFICATION_COUNT,
      count: data.count,
    });
  }, (error) => {
    console.log('error fetching unread count', error);
  })
};

export const clearNotifications = () => (dispatch, getState) => {
  const authToken = getAuthToken(getState());

  return axios({
    method: 'delete',
    url: `${API_URL}/users/notification_counts`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(() => {
    dispatch({
      type: CLEAR_NOTIFICATIONS,
    });
  })
};

export const touchNotification = (id) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());

  return axios({
    method: 'patch',
    url: `${API_URL}/users/notifications/${id}`,
    headers: {
      'Authorization': `Token ${authToken}`
    }
  })
  .then(() => {
    dispatch({
      type: TOUCH_NOTIFICATION,
      id,
    });
  });
}

export const hideNewNotification = (id) => ({
  type: HIDE_NEW_NOTIFICATION,
  id,
})
