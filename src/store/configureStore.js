import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import throttle from 'lodash/throttle';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './rootReducer';
import { loadState, saveState } from './localStorage';

const configureStore = (initialState = {}) => {
  let middleware = applyMiddleware(thunk, routerMiddleware(browserHistory));

  if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    const devtools = window.devToolsExtension();
    middleware = compose(middleware, devtools);
  }

  const persistedState = loadState();

  const store = createStore(rootReducer, { ...persistedState, ...initialState }, middleware);

  /* ==============================================================
  Every time store is updated, persist the state to local storage.
  Wrapping with throttle to make sure it doesn't get called more
  than once every 1000ms
  ============================================================== */
  store.subscribe(throttle(() => {
    const state = store.getState();
    const stateToPersist = {
      currentUser: state.currentUser,
    };
    saveState(stateToPersist);
  }, 1000));

  return store;
};

export default configureStore;
