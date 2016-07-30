import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Profile from './components/Profile';

import './styles/index.css';

import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/profile" component={Profile}/>
  </Router>,
  document.getElementById('root')
);
