import axios from 'axios';
import { getAuthToken, getCurrentUser } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';
import {
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../actionTypes';

export const followUser = (userId) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());
  const currentUser = getCurrentUser(getState());
  return axios({
    method: 'post',
    url: `${API_URL}/follow/${userId}`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    dispatch({
      type: FOLLOW_USER,
      username: data.user.username,
      currentUserUsername: currentUser.username,
      userId,
    });
  });
};

export const unfollowUser = (userId) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());
  const currentUser = getCurrentUser(getState());
  return axios({
    method: 'delete',
    url: `${API_URL}/unfollow/${userId}`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    dispatch({
      type: UNFOLLOW_USER,
      username: data.user.username,
      currentUserUsername: currentUser.username,
      userId,
    });
  });
};
