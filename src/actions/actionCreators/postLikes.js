import axios from 'axios';
import {
  LIKE_POST,
  DISLIKE_POST
} from '../actionTypes';
import { getAuthToken } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';

export const likePost = (postId) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());

  return axios({
    method: 'post',
    url: `${API_URL}/posts/${postId}/likes`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(response => {
    dispatch({
      type: LIKE_POST,
      postId,
    });
  })
  .catch(response => {
    console.error('could not like post', response);
  });
}

export const dislikePost = (postId) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());

  return axios({
    method: 'delete',
    url: `${API_URL}/posts/${postId}/likes`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(response => {
    dispatch({
      type: DISLIKE_POST,
      postId,
    });
  })
  .catch(response => {
    console.error('could not dislike post', response);
  });
}
