import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import { getIsSignedIn, getCurrentUser } from './store/rootReducer';
import ActionCable from 'actioncable';
import WebNotifications from './actioncable/WebNotificationsSubscription';

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
window.App.cable = ActionCable.createConsumer('ws://localhost:5000/api/cable');
const isSignedIn = getIsSignedIn(store.getState());

if (isSignedIn === true) {
  console.log('Createing subscription...')
  const { username } = getCurrentUser(store.getState());
  WebNotifications.subscribe(username, (data) => {
    console.log('ACTION CABLE', data);
    console.log('payload', JSON.parse(data.json))
  });
}
