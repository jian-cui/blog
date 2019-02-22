import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import store from '../react/Store.js';
import App from '../react/App.js';
// import { actions as commonActions } from '../react/redux.common.js'
import * as articleList from '../react/components/ArticleList/';
// import * as articleContent from '../react/components/ArticleContent/';
import { StaticRouter, Route, Switch, matchPath } from "react-router-dom";
import reducer, { initReducer } from '../react/Reducer.js';
import { combineReducers, createStore } from 'redux';
import routes from '../react/router/routes.js';
import '../react/less/common.less';

function safeJSONstringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

// const routerMatchProps = [{
//   path: '/',
//   exact: true,
//   component: articleList.view
// }, {
//   path: '/post/:id',
//   component: articleContent.view
// }]

// 路由初始数据
const pathInitData = {
  '/': {
    key: articleList.key,
    reducer: articleList.reducer,
    // state: articleList.state,
    component: articleList.view
  },
  // '/post/:id': {
  //   key: articleContent.key,
  //   reducer: articleContent.reducer,
  //   state: articleContent.state,
  //   component: articleContent.view
  // }
}

/**
 * 路由
 * 
 * @param {any} props 
 * @returns React Component
 */
function Routes(props) {
  const {url, context} = props;
  return (
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
}

/**
 * 申请页面时，在服务器上直出初始页面
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} assetManifest 
 * @param {any} match 
 * @param {any} index 
 */
async function handleRender(req, res, assetManifest, match, index) {
  const pathData = pathInitData[match.path];
  const component = pathData.component;

  // const store = createStore(reducer);

  // store.dispatch(commonActions.setId(match.params.id ? match.params.id : -1));
  
  store._reducers = {
    ...initReducer,
    [pathData.key]: pathData.reducer
  }
  store.reset(combineReducers({
    // ...initReducer
    ...store._reducers
  }), {
    ...store.getState(),
    [pathData.key]: {}
  })

  // 服务器端获取数据
  let prefetchTasks = [];
  let _tasks;
  if (component && component.fetch) {

    _tasks = component.fetch(store.getState(), store.dispatch)

    if (Array.isArray(_tasks)) {
      prefetchTasks = prefetchTasks.concat(_tasks);
    } else if (_task.then) {
      prefetchTasks.push(_tasks);
    }
  }

  await Promise.all(prefetchTasks);

  console.log(222, store.getState())
  const context = {}
  console.log(store);
  // Render the component to a string
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Routes context={context} url={req.url} />
    </Provider>
  )

  console.log('server rendered html: ', html);
  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
  // Send the rendered page back to the client
  res.render('template', {
    PUBLIC_URL: '/',
    html: html,
    preloadedState: safeJSONstringify(preloadedState),
    assetManifest: assetManifest,
    env: process.env.NODE_ENV
  }, function(err, html) {
    if (err) console.log(err);
    res.send(html);
  })
}

/**
 * 渲染页面
 * 
 * @param {any} req 请求
 * @param {any} res 返回数据
 * @param {any} assetManifest 静态文件信息
 * @param {any} next 
 */
function renderPage(req, res, assetManifest, next) {
  // function isMatch(routerProp) {
  //   const match = matchPath(req.url, routerProp);
  //   if (match) return true;
  //   return false;
  // }
  let match, index;
  for (let i=0;i<routes.length;i++) {
    match = matchPath(req.url, routes[i]);
    index = i;
    if (match) break;
  }
  if (match) {
    handleRender(req, res, assetManifest, match, index);
  } else {
    next();
  }
}

export default renderPage;

// export default hot(module)(Routes);
// export default Routes;