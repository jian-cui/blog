import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import store from '../react/Store.js';
import App from '../react/App.js';
import * as articleList from '../react/components/ArticleList/';
import * as articleContent from '../react/components/ArticleContent/';
import { StaticRouter as Router, Route, Switch, matchPath } from "react-router-dom";
// import fetch from 'isomorphic-fetch';
import {combineReducers} from 'redux';
import '../react/less/common.less';

function safeJSONstringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

const routerMatchProps = [{
  path: '/',
  exact: true,
  component: articleList.view
}, {
  path: '/post/:id',
  component: articleContent.view
}]

const pathInitData = {
  '/': {
    stateKey: articleList.stateKey,
    reducer: articleList.reducer,
    state: articleList.state
  },
  '/post/:id': {
    stateKey: articleContent.stateKey,
    reducer: articleContent.reducer,
    state: articleContent.state
  }
}

class Routes extends React.Component {
  render() {
    const {url, context} = this.props;
    return (
      <Router location={url} context={context}>
        <App>
          <Switch>
            <Route path="/" exact component={articleList.view} />
            <Route path="/post/:id" component={articleContent.view} />
          </Switch>
        </App>
      </Router>
    );
  }
}

async function handleRender(req, res, assetManifest, matchIndex) {

  const matchedPath = routerMatchProps[matchIndex].path;
  const component = routerMatchProps[matchIndex].component;
  const pathData = pathInitData[matchedPath];
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
  const prefetchTasks = [];
  let _tasks;
  if (component && component.fetch) {
    _tasks = component.fetch(store.dispatch)
    if (Array.isArray(_tasks)) {
      prefetchTasks.concat(_tasks);
    } else if (_task.then) {
      prefetchTasks.push(_tasks);
    }
  }
  await Promise.all(_tasks);
  // Create a new Redux store instance
  // const store = createStore(reactApp)
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

function renderPage(req, res, assetManifest, next) {
  function isMatch(routerProp) {
    const match = matchPath(req.url, routerProp);
    if (match) return true;
    return false;
  }
  const matchIndex = routerMatchProps.findIndex(isMatch);
  if (matchIndex >= 0) {
    handleRender(req, res, assetManifest, matchIndex);
  } else {
    next();
  }
}

export default renderPage;

// export default hot(module)(Routes);
// export default Routes;