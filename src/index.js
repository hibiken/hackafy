import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import '../styles/vendors/normalize.css';
import '../styles/vendors/skeleton.css';
import '../styles/vendors/cssgram.min.css';
import './styles/index.css';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
