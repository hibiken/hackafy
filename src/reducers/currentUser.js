import {
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  PROFILE_UPDATE_SUCCESS,
  POST_UPLOAD_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  authenticationToken: null,
  postIds: [],
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP_SUCCESS:
    case USER_SIGN_IN_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case POST_UPLOAD_SUCCESS:
      return {
        ...state,
        postIds: [...state.postIds, action.payload.id],
      }
    case USER_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

/*** Selectors ***/
export const getCurrentUser = (state) => {
  return state;
};

export const getAuthToken = (state) => {
  return state.authenticationToken;
};

export default currentUser;
