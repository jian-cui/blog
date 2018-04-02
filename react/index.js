import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.js';
import { Provider } from 'react-redux';
import store from './Store.js';
import "./less/common.less";

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);