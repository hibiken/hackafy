import axios from 'axios';
import { API_URL } from '../../config/constants';
import {
  getAuthToken,
  getPostById,
} from '../../store/rootReducer';
import {
  FETCH_MORE_COMMENTS_SUCCUESS,
} from '../actionTypes';

export const fetchMoreComments = (postId) => (dispatch, getState) => {
  const post = getPostById(getState(), postId);
  if (post == null) {
    console.log('no post exist with id', postId);
    return;
  }

  const { nextPage } = post.commentPagination;
  const authToken = getAuthToken(getState());
  return axios({
    method: 'get',
    url: `${API_URL}/posts/${postId}/comments?page=${nextPage}`,
    headers: {
      'Authorization': `Token ${authToken}`
    },
  })
  .then(({data}) => {
    dispatch({
      type: FETCH_MORE_COMMENTS_SUCCUESS,
      payload: data.comments,
      pagination: data.meta,
      postId,
    });
  }, error => {
    console.log('Fetch more comments failed', error);
  });
}
