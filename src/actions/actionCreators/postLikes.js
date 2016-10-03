import axios from 'axios';
import {
  LIKE_POST,
  DISLIKE_POST
} from '../actionTypes';
import { getAuthToken } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';

export const likePost = (postId) => (dispatch, getState) => {
  // optimistic update
  dispatch({
    type: LIKE_POST,
    postId,
  });

  const authToken = getAuthToken(getState());
  return axios({
    method: 'post',
    url: `${API_URL}/posts/${postId}/likes`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(response => {
    // request success no-op
  }, error => {
    // undo optimistic update
    dispatch({
      type: DISLIKE_POST,
      postId,
    });
    console.log('like post request failed', error);
  });
}

export const dislikePost = (postId) => (dispatch, getState) => {
  dispatch({
    type: DISLIKE_POST,
    postId,
  });

  const authToken = getAuthToken(getState());
  return axios({
    method: 'delete',
    url: `${API_URL}/posts/${postId}/likes`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(response => {
    // request success noop
  }, error => {
    // updo optimistic update
    dispatch({
      type: LIKE_POST,
      postId,
    });
  });
}
