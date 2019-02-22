import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
// import Routes from './router/';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './Store.js';
import "./less/common.less";

function Routes() {
  return (
    <Router>
      <App></App>
    </Router>
  )
}

// 判断是否是服务器渲染
// 如果是服务器渲染 则使用ReactDom.hydrate 只绑定事件 不重新渲染
const render = process.env.SSR === true ? ReactDOM.hydrate : ReactDOM.render;

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);