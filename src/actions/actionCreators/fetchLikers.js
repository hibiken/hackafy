import axios from 'axios';
import {
  getAuthToken,
  getLikerPaginationByPostId,
 } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';
import {
  FETCH_LIKERS_START,
  FETCH_LIKERS_SUCCESS,
  FETCH_LIKERS_FAILURE,
} from '../actionTypes';

export const fetchLikers = (postId) => (dispatch, getState) => {
  dispatch({type: FETCH_LIKERS_START});

  const authToken = getAuthToken(getState());
  const nextPage = getLikerPaginationByPostId(getState(), postId).nextPage;

  const url = (nextPage === null)
              ? `${API_URL}/posts/${postId}/likers`
              : `${API_URL}/posts/${postId}/likers?page=${nextPage}`

  return axios({
    method: 'get',
    url,
    headers: {
      'Authorization': `Token ${authToken}`
    },
  })
  .then(({data}) => {
    console.log('successfully fetched likers', data);
    dispatch({
      type: FETCH_LIKERS_SUCCESS,
      payload: data.users,
      pagination: data.meta,
      postId,
    })
  }, (error) => {
    console.log('error fetching likers', error);
    dispatch({
      type: FETCH_LIKERS_FAILURE,
    })
  })
}
