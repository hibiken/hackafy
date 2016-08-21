import axios from 'axios';
import { getAuthToken } from '../../store/rootReducer';
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

  return axios({
    method: 'get',
    url: `${API_URL}/users/${username}/followers`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched followers', data);
    dispatch({
      type: FETCH_FOLLOWERS_SUCCESS,
      payload: data.users,
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

  return axios({
    method: 'get',
    url: `${API_URL}/users/${username}/following`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched following', data);
    dispatch({
      type: FETCH_FOLLOWING_SUCCESS,
      payload: data.users,
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
