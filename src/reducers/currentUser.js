import {
  USER_SIGN_IN_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  authenticationToken: null,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default currentUser;
