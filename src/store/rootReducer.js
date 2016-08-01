import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import currentUser from '../reducers/currentUser';

const rootReducer = combineReducers({
  routing,
  form,
  currentUser,
});

/*** Selectors ***/
export const getIsSignedIn = (state) => {
  return Boolean(state.currentUser.authenticationToken);
};

export default rootReducer;
