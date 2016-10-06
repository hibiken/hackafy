import axios from 'axios';
import {
  FETCH_PUBLIC_PROFILE_START,
  FETCH_PUBLIC_PROFILE_SUCCESS,
  FETCH_PUBLIC_PROFILE_FAILURE,
  FETCH_POSTS_BY_USERNAME_START,
  FETCH_POSTS_BY_USERNAME_SUCCESS,
  FETCH_POSTS_BY_USERNAME_FAILURE
} from '../actionTypes';
import { getAuthToken, getPaginationByUsername } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';

export const fetchPublicProfile = (username) => (dispatch, getState) => {
  dispatch({type: FETCH_PUBLIC_PROFILE_START});

  const authToken = getAuthToken(getState());

  return axios({
    method: 'get',
    url: `${API_URL}/users/${username}/public_profile`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    dispatch({
      type: FETCH_PUBLIC_PROFILE_SUCCESS,
      payload: data.user,
      username,
    })
  },  ({response}) => {
    const { errors } = response.data;
    dispatch({
      type: FETCH_PUBLIC_PROFILE_FAILURE,
      errors,
    })
  });
}

export const fetchPostsByUsername = (username) => (dispatch, getState) => {
  dispatch({type: FETCH_POSTS_BY_USERNAME_START});

  const authToken = getAuthToken(getState());
  const pagination = getPaginationByUsername(getState(), username);
  const url = (!pagination.nextPage) ?
              `${API_URL}/users/${username}/posts` :
              `${API_URL}/users/${username}/posts?page=${pagination.nextPage}`;
  return axios({
    method: 'get',
    url,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    dispatch({
      type: FETCH_POSTS_BY_USERNAME_SUCCESS,
      payload: data.posts,
      pagination: data.meta,
      username,
    })
  },  (response) => {
    dispatch({
      type: FETCH_POSTS_BY_USERNAME_FAILURE,
    })
  });
}
