import axios from 'axios';
import { getAuthToken } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';
import {
  ADD_COMMENT
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
    })
  })
  .catch(response => {
    console.log('could not create a comment', response);
  });
}
