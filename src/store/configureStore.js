import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './rootReducer';

const configureStore = (initialState = {}) => {
  let middleware = applyMiddleware(thunk, routerMiddleware(browserHistory));

  if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    const devtools = window.devToolsExtension();
    middleware = compose(middleware, devtools);
  }

  const store = createStore(rootReducer, initialState, middleware);

  return store;
};

export default configureStore;
