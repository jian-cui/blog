import React from 'react';
import App from './App.js';
// import { view as ArticleList } from './components/ArticleList/';
// import { view as ArticleContent} from './components/ArticleContent/';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import {combineReducers} from 'redux';
import { hot } from 'react-hot-loader';
import store from './Store.js';
// async function getArticleList() {
//   const component = await import(/* webpackChunkName: "articleList" */ './components/ArticleList/');
//   // const component = require('./components/ArticleList/');
//   console.log(ArticleList == component.view)
//   // console.log()
//   return component.view;
//   // return import(/* webpackChunkName: "articleList" */ './components/ArticleList/').then(component => {
//   //   return component.default
//   // }).catch(error => 'An error occurred while loading the component');
// }

function asyncComponentHOC(importComponent) {
  return class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        component: null
      }
    }
    async componentDidMount() {
      // const { view: component } = await importComponent();
      const { view: component, stateKey: stateKey, reducer, state } = await importComponent();
      // console.log('1', stateKey, state);
      // const state = store.getState();
      // store._reducers = {
      //   ...store._reducers,
      //   [stateKey]: reducer
      // }
      store.reset(combineReducers({
        ...store._reducers,
        [stateKey]: reducer
      }), {
        ...store.getState(),
        [stateKey]: state
      })
      // store.reset(combineReducers({
      //   ...store._reducers,
      //   [stateKey]: reducer
      // }), {
      //   ...store.getState(),
      //   [stateKey]: state
      // })

      this.setState({
        component: component
      })
    }
    render() {
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props} /> : null;
    }
  }
}
// const AsyncArticleList = asyncComponentHOC('./components/ArticleList/');
// const AsyncArticleContent = asyncComponentHOC('./components/ArticleContent/');

const AsyncArticleList = asyncComponentHOC(() => import(/* webpackChunkName: "home" */ './components/ArticleList/'));
const AsyncArticleContent = asyncComponentHOC(() => import(/* webpackChunkName: "content" */ './components/ArticleContent/'));
AsyncArticleList.displayName = `Async(Home)`;
AsyncArticleContent.displayName = `Async(Content)`;

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={AsyncArticleList} /> 
            <Route path="/post/:id" component={AsyncArticleContent} />
          </Switch>
        </App>
      </Router>
    );
  }
}

// class ProviderRoutes extends React.Component {
//   render() {
//     return (
//       <Provider store={store()}>
//         <Routes />
//       </Provider>
//     )
//   }
// }
export default hot(module)(Routes);