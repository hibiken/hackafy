import axios from 'axios';
import { getAuthToken } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';
import {
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../actionTypes';

export const followUser = (userId) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());
  return axios({
    method: 'post',
    url: `${API_URL}/follow/${userId}`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(() => {
    console.log('successfully followed!');
    dispatch({
      type: FOLLOW_USER,
      userId,
    });
  });
};

export const unfollowUser = (userId) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());
  return axios({
    method: 'delete',
    url: `${API_URL}/unfollow/${userId}`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(() => {
    console.log('successfully unfollowed!');
    dispatch({
      type: UNFOLLOW_USER,
      userId,
    });
  });
};
