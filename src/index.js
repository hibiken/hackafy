import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import { getIsSignedIn, getCurrentUser } from './store/rootReducer';
import ActionCable from 'actioncable';

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
const { username } = getCurrentUser(store.getState());

if (isSignedIn === true) {
  console.log('Createing subscription...')
  window.App.WebNotificationSubscription = window.App.cable.subscriptions.create({
    channel: "WebNotificationsChannel",
    username,
  }, {
    received(data) {
      console.log('ACTION CABLE', data);
      console.log('payload', JSON.parse(data.json))
    }
  });
}
