import axios from 'axios';
import {
  getAuthToken,
  getFollowingNextPageByUsername,
  getFollowerNextPageByUsername,
} from '../../store/rootReducer';
import { API_URL } from '../../config/constants';
import {
  FETCH_FOLLOWERS_START,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE,
  FETCH_FOLLOWING_START,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAILURE
} from '../actionTypes';

export const fetchFollowers = (username) => (dispatch, getState) => {
  dispatch({type: FETCH_FOLLOWERS_START});

  const authToken = getAuthToken(getState());
  const nextPage = getFollowerNextPageByUsername(getState(), username);
  const url = (nextPage === null)
              ? `${API_URL}/users/${username}/followers`
              : `${API_URL}/users/${username}/followers?page=${nextPage}`

  return axios({
    method: 'get',
    url,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched followers', data);
    dispatch({
      type: FETCH_FOLLOWERS_SUCCESS,
      payload: data.users,
      pagination: data.meta,
      username,
    })
  })
  .catch(response => {
    console.log('fetch followers failed', response);
    dispatch({
      type: FETCH_FOLLOWERS_FAILURE,
    });
  });
}

export const fetchFollowing = (username) => (dispatch, getState) => {
  dispatch({type: FETCH_FOLLOWING_START});

  const authToken = getAuthToken(getState());
  const nextPage = getFollowingNextPageByUsername(getState(), username);
  const url = (nextPage === null)
              ? `${API_URL}/users/${username}/following`
              : `${API_URL}/users/${username}/following?page=${nextPage}`

  return axios({
    method: 'get',
    url,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched following', data);
    dispatch({
      type: FETCH_FOLLOWING_SUCCESS,
      payload: data.users,
      pagination: data.meta,
      username,
    })
  })
  .catch(response => {
    console.log('fetch following failed', response);
    dispatch({
      type: FETCH_FOLLOWING_FAILURE,
    });
  });
}
