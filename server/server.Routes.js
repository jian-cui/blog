import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import store from '../react/Store.js';
import App from '../react/App.js';
import { actions as commonActions } from '../react/redux.common.js'
import * as articleList from '../react/components/ArticleList/';
import * as articleContent from '../react/components/ArticleContent/';
import { StaticRouter as Router, Route, Switch, matchPath } from "react-router-dom";
import {combineReducers} from 'redux';
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

const pathInitData = {
  '/': {
    stateKey: articleList.stateKey,
    reducer: articleList.reducer,
    state: articleList.state,
    component: articleList.view
  },
  '/post/:id': {
    stateKey: articleContent.stateKey,
    reducer: articleContent.reducer,
    state: articleContent.state,
    component: articleContent.view
  }
}

class Routes extends React.Component {
  render() {
    const {url, context} = this.props;
    return (
      <Router location={url} context={context}>
        <App>
          <Switch>
            {
              routes.map(route => {
                <Route {...route} key={route.path} />
              })
            }
          </Switch>
        </App>
      </Router>
    );
  }
}

async function handleRender(req, res, assetManifest, match, index) {
  const pathData = pathInitData[match.path];
  const component = pathData.component;

  store.dispatch(commonActions.setId(match.params.id ? match.params.id : -1));

  store._reducers = {
    ...store._reducers,
    [pathData.stateKey]: pathData.reducer
  }
  store.reset(combineReducers({
    ...store._reducers
  }), {
    ...store.getState(),
    [pathData.stateKey]: pathData.state
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

  await Promise.all(prefetchTasks)

  const context = {}
  // Render the component to a string
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Routes context={context} url={req.url} />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
  // console.log(preloadedState);
  // Send the rendered page back to the client
  res.render('template', {
    PUBLIC_URL: '/',
    html: html,
    preloadedState: safeJSONstringify(preloadedState),
    assetManifest: assetManifest
  }, function(err, html) {
    res.send(html);
  })
}

const getMatch=(routesArray, url)=>{
  return routesArray.some(router=>matchPath(url,{
    path: router.path,
    exact: router.exact,
  }))
}

function renderPage(req, res, assetManifest, next) {
  function isMatch(routerProp) {
    const match = matchPath(req.url, routerProp);
    if (match) return true;
    return false;
  }
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