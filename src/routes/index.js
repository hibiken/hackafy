import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import SignIn from '../components/SignIn';
import Profile from '../components/Profile';

import requireAuth from './requireAuth';

const createRoutes = (store) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={requireAuth(Home)} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={requireAuth(Profile)} />
      </Route>
    </Router>
  );
};

export default createRoutes;
