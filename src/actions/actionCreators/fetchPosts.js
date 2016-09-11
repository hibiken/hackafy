import axios from 'axios';
import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_BY_LOCATION_SUCCESS,
  FETCH_POSTS_BY_LOCATION_FAILURE,
  FETCH_POSTS_BY_TAG_SUCCESS,
  FETCH_POSTS_BY_TAG_FAILURE
} from '../actionTypes';
import {
  getAuthToken,
  getPostsNextPage,
  getPaginationByTagName,
} from '../../store/rootReducer';
import { API_URL } from '../../config/constants';

export const fetchPosts = () => (dispatch, getState) => {
  dispatch({type: FETCH_POSTS_START});

  const authToken = getAuthToken(getState());
  const nextPage = getPostsNextPage(getState());
  const url = (nextPage === null) ? `${API_URL}/posts` : `${API_URL}/posts?page=${nextPage}`

  return axios({
    method: 'get',
    url,
    headers: {
      'Authorization': `Token ${authToken}`
    },
  })
  .then(({data}) => {
    console.log('successfully fetched posts', data);
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: data.posts,
      pagination: data.meta,
    })
  })
  .catch(response => {
    console.log('fetch posts failed', response);
    dispatch({
      type: FETCH_POSTS_FAILURE,
    })
  });
}

export const fetchPostsByPlaceId = (placeId) => (dispatch, getState) => {
  dispatch({type: FETCH_POSTS_START});

  const authToken = getAuthToken(getState());

  return axios({
    method: 'get',
    url: `${API_URL}/locations/${placeId}`,
    headers: {
      'Authorization': `Token ${authToken}`
    },
  })
  .then(({data}) => {
    console.log('successfully fetched posts', data);
    dispatch({
      type: FETCH_POSTS_BY_LOCATION_SUCCESS,
      payload: data.posts,
      placeId,
    });
  })
  .catch(response => {
    console.log('fetch posts failed', response);
    dispatch({
      type: FETCH_POSTS_BY_LOCATION_FAILURE,
    });
  });
}

export const fetchPostsByTagName = (tagName) => (dispatch, getState) => {
  dispatch({type: FETCH_POSTS_START});

  const authToken = getAuthToken(getState());
  const pagination = getPaginationByTagName(getState(), tagName);
  const url = (!pagination.nextPage) ?
              `${API_URL}/posts/tags/${tagName}` :
              `${API_URL}/posts/tags/${tagName}?page=${pagination.nextPage}`;

  return axios({
    method: 'get',
    url,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(({data}) => {
    console.log('successfully fetched posts', data);
    dispatch({
      type: FETCH_POSTS_BY_TAG_SUCCESS,
      payload: data.posts,
      pagination: data.meta,
      tagName,
    })
  }, (error) => {
    console.log('fetch posts by tagname failure', error);
    dispatch({
      type: FETCH_POSTS_BY_TAG_FAILURE,
    })
  });
}
