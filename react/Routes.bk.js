import React from 'react';
import App from './App.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {combineReducers} from 'redux';
import { hot } from 'react-hot-loader';
import store from './Store.js';
import { actions as commonActions, stateKey as commonStateKey } from './redux.common.js'

const win = global.window;

function asyncComponentHOC(importComponent) {
  return class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        component: null
      }
      // 设置公用redux
      store.dispatch(commonActions.setId(this.props.params.id ? this.props.params.id : -1));
    }
    async componentDidMount() {
      const { view: component, stateKey: stateKey, reducer, state } = await importComponent();

      const dehydratedState = (win && win.DEHYDRATED_STATE);
      const oldState = store.getState();
      const mergedState = {...dehydratedState, ...oldState};

      const statePromise = mergedState[stateKey]
        ? Promise.resolve(mergedState[stateKey])
        : component.fetch(store.getState(), store.dispatch);
      
      statePromise.then(result => {
        store._reducers = {
          ...store._reducers,
          [stateKey]: reducer
        }
        store.reset(combineReducers({
          ...store._reducers
        }), {
          // ...store.getState(),
          // [stateKey]: state,
          ...mergedState
        })
  
        this.setState({
          component: component
        })
      })
    }
    render() {
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props} /> : null;
    }
  }
}

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