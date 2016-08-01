import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  routing,
  form,
  currentUser,
});

export default rootReducer;
