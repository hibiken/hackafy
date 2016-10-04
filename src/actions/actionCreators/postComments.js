import axios from 'axios';
import { getAuthToken } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../actionTypes';

export const addComment = (postId, commentBody) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());

  return axios({
    method: 'post',
    url: `${API_URL}/posts/${postId}/comments`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
    data: {
      body: commentBody
    },
  })
  .then(({data}) => {
    console.log('successfully created comment', data);
    dispatch({
      type: ADD_COMMENT,
      payload: data.comment,
      postId,
    })
  })
  .catch(response => {
    console.log('could not create a comment', response);
  });
}

export const deleteComment = (postId, commentId) => (dispatch, getState) => {
  const authToken = getAuthToken(getState());

  return axios({
    method: 'delete',
    url: `${API_URL}/posts/${postId}/comments/${commentId}`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(() => {
    console.log('successfully delete comment');
    dispatch({
      type: DELETE_COMMENT,
      postId,
      commentId,
    });
  }, (error) => {
    console.log('delete comment failed', error);
  });
}
