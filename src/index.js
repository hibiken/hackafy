import React from 'react';
import ReactDOM from 'react-dom';

import MainLayout from './components/MainLayout';
import App from './components/App';
import Profile from './components/Profile';

import './styles/index.css';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={App} />
      <Route path="/profile" component={Profile} />
    </Route>


  </Router>,
  document.getElementById('root')
);
