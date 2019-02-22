import React from 'react';
import {combineReducers} from 'redux';
import store from '../Store.js';
// import { actions as commonActions } from '../redux.common.js'
// import ArticleList from '../components/ArticleList';

const win = global.window;

// async function getComponentAsync(props, importComponent) {
//   // 文章ID
//   const id = props.match.params.id ? props.match.params.id : -1;
//   store.dispatch(commonActions.setId(id));

//   const { view: Component, stateKey: stateKey, reducer, state } = await importComponent();

//   const dehydratedState = (win && win.DEHYDRATED_STATE);
//   // const oldState = store.getState();
//   // const mergedState = {...dehydratedState, ...oldState};

//   // 这么写是因为在有数据后就不要进行不必要的fetch
//   let statePromise;
//   if (dehydratedState[stateKey]) {
//     statePromise = Promise.resolve(dehydratedState[stateKey]);
//   } else if (Component.fetch) {
//     statePromise = Component.fetch(store.getState(), store.dispatch);
//   } else {
//     statePromise = Promise.resolve(dehydratedState[stateKey]);
//   }
//   // const statePromise = dehydratedState[stateKey]
//   //   ? Promise.resolve(dehydratedState[stateKey])
//   //   : Component.fetch(store.getState(), store.dispatch);
//   console.log(2)
//   statePromise.then(result => {
//     store._reducers = {
//       ...store._reducers,
//       [stateKey]: reducer
//     }
//     store.reset(combineReducers({
//       ...store._reducers
//     }), {
//       ...store.getState(),
//       ...dehydratedState
//     })
//     return (
//       <Component {...props} />
//     )
//   });
// }

/**
 * 高阶组件
 * 防止初次申请页面时，接口重新申请数据
 * 
 * @param {any} importComponent 
 * @returns 
 */
function asyncComponentHOC(importComponent) {
  return class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        component: importComponent.view
      }
      // 设置公用redux
      // store.dispatch(commonActions.setId(props.match.params.id ? props.match.params.id : -1));
    }
    /**
     * 是否拆分为constructor和componentDidMount两部分？
     * 
     */
    async componentDidMount() {
      const { view: component, key: key, reducer, state } = importComponent;
      let dehydratedState = (win && win.DEHYDRATED_STATE);
      dehydratedState = dehydratedState ? dehydratedState : {};
      // const oldState = store.getState();
      // const mergedState = {...dehydratedState, ...oldState};

      // 这么写是因为在有数据后就不要进行不必要的fetch
      let statePromise;
      if (dehydratedState[key] || !component.fetch) {
        // 对于需要fetch，但是服务器已经fetch好的页面
        // 对于不用fetch的页面
        statePromise = Promise.resolve(dehydratedState);
        statePromise.then(result => {
          store._reducers = {
            ...store._reducers,
            [key]: reducer
          }
          store.reset(combineReducers({
            ...store._reducers
          }), {
            // ...store.getState(),
            ...dehydratedState
          })

          // this.setState({
          //   component: component
          // })
          // 清空预置内容
          win.DEHYDRATED_STATE = {};
        })
      } else if (component.fetch) {
        // 对于需要自己fetch的页面
        store._reducers = {
          ...store._reducers,
          [key]: reducer
        }
        store.reset(combineReducers({
          ...store._reducers
        }), {
          ...store.getState(),
          [key]: state
        })
        statePromise = component.fetch(store.getState(), store.dispatch);
        Promise.all(statePromise).then(result => {
          // this.setState({
          //   component: component
          // })
        })
      }
    }
    render() {
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props} /> : null;
    }
  }
}

// const AsyncArticleList = asyncComponentHOC(() => import(/* webpackChunkName: "home" */ '../components/ArticleList/'));
const AsyncArticleList = asyncComponentHOC(require('../components/ArticleList/'));
// const AsyncArticleContent = asyncComponentHOC(() => import(/* webpackChunkName: "content" */ '../components/ArticleContent/'));
AsyncArticleList.displayName = 'Async(Home)';
// AsyncArticleContent.displayName = 'Async(Content)';

export default [{
    path: '/',
    exact: true,
    component: AsyncArticleList
  }, 
  // {
  //   path: '/post/:id',
  //   component: AsyncArticleContent
  // }
]



