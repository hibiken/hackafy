import axios from 'axios';
import { push } from 'react-router-redux';
import {
  POST_UPLOAD_START,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILURE
} from '../actionTypes';
import { API_URL } from '../../config/constants';
import { getAuthToken } from '../../store/rootReducer';

export const uploadPost = ({ caption, filter, address, lat, lng }, file) => (dispatch, getState) => {
  dispatch({type: POST_UPLOAD_START});

  const authToken = getAuthToken(getState());

  let formData = new FormData();
  formData.append('photo', file);
  formData.append('caption', caption);
  formData.append('filter', filter);
  if (address && lat && lng) {
    formData.append('address', address);
    formData.append('lat', lat);
    formData.append('lng', lng);
  }

  return axios({
    method: 'post',
    url: `${API_URL}/posts`,
    data: formData,
    headers: {
      'Authorization': `Token ${authToken}`
    }
  })
  .then(({data}) => {
    console.log('successfully uploaded post', data);
    dispatch({
      type: POST_UPLOAD_SUCCESS,
      payload: data.post,
    });
    dispatch(push('/'));
  })
  .catch(response => {
    console.log('post upload failed', response);
    dispatch({
      type: POST_UPLOAD_FAILURE,
    })
    // TODO: write reducer
  });
}
