import {
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT
} from '../actions/actionTypes';

const initialState = {
  authenticationToken: null,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP_SUCCESS:
    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case USER_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default currentUser;
