import axios from 'axios';
import { API_URL } from '../../config/constants';
import {
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE
} from '../actionTypes';
import { getAuthToken } from '../../store/rootReducer';
import { push } from 'react-router-redux';

export const userUpdate = ({ username }) => (dispatch, getState) => {
  // TODO: show spinner

  const authToken = getAuthToken(getState());

  return axios({
    method: 'patch',
    url: `${API_URL}/me`,
    data: {
      username,
    },
    headers: {
      'Authorization': `Token ${authToken}`
    }
  })
  .then(({data}) => {
    console.log('successfully updated!!', data);
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data.user,
    });
    dispatch(push('/profile'));
  })
  .catch(response => {
    console.log('profile update failed', response);
    dispatch({
      type: PROFILE_UPDATE_FAILURE,
    });
  });
}
