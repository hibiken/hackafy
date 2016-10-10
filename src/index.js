import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import { getIsSignedIn, getAuthToken } from './store/rootReducer';
import { createConsumerWithToken } from './actioncable/createConsumerWithToken';
import WebNotifications from './actioncable/WebNotificationsSubscription';
import { handleNotificationReceived } from './actions';

import './styles/vendors/normalize.css';
import './styles/vendors/skeleton.css';
import './styles/vendors/cssgram.min.css';
import './styles/index.css';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

/**** Action cable logic ***/
window.App = {};

const isSignedIn = getIsSignedIn(store.getState());

if (isSignedIn === true) {
  const authToken = getAuthToken(store.getState());
  createConsumerWithToken(authToken);
  WebNotifications.subscribe((data) => {
    store.dispatch(handleNotificationReceived(data.notification))
  });
}
