import axios from 'axios';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE
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
}
