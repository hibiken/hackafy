import axios from 'axios';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATION_COUNT,
  CLEAR_NOTIFICATIONS
} from '../actionTypes';
import { getAuthToken } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';

export const fetchNotifcations = () => (dispatch, getState) => {
  dispatch({type: FETCH_NOTIFICATIONS_START});

  const authToken = getAuthToken(getState());

  return axios({
    method: 'get',
    url: `${API_URL}/users/notifications`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched notifications', data);
    dispatch({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      payload: data.notifications,
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
}
