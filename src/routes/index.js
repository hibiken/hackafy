import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import MainLayout from '../components/MainLayout';
import App from '../components/App';
import Profile from '../components/Profile';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={App} />
      <Route path="/profile" component={Profile} />
    </Route>
  </Router>
);
