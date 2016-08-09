import axios from 'axios';
import {
  FETCH_PUBLIC_PROFILE_START,
  FETCH_PUBLIC_PROFILE_SUCCESS,
  FETCH_PUBLIC_PROFILE_FAILURE,
  FETCH_POSTS_BY_USERNAME_START,
  FETCH_POSTS_BY_USERNAME_SUCCESS,
  FETCH_POSTS_BY_USERNAME_FAILURE
} from '../actionTypes';
import { getAuthToken } from '../../store/rootReducer';
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
    console.log('successfully fetched public profile', data);
    dispatch({
      type: FETCH_PUBLIC_PROFILE_SUCCESS,
      payload: data.user,
    })
  },  (response) => {
    console.log('could not fetch public profile', response);
    dispatch({
      type: FETCH_PUBLIC_PROFILE_FAILURE,
    })
  });
}

export const fetchPostsByUsername = (username) => (dispatch, getState) => {
  dispatch({type: FETCH_POSTS_BY_USERNAME_START});

  const authToken = getAuthToken(getState());

  return axios({
    method: 'get',
    url: `${API_URL}/users/${username}/posts`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched posts', data);
    dispatch({
      type: FETCH_POSTS_BY_USERNAME_SUCCESS,
      payload: data.posts,
    })
  },  (response) => {
    console.log('could not fetch public profile', response);
    dispatch({
      type: FETCH_POSTS_BY_USERNAME_FAILURE,
    })
  });
}
