# React v16.0.0同构直出方案(React, React-Router, SPA, HMR)

最近将博客做了升级，实现了React的code splitting、HMR、SSR，代码见[这里](https://github.com/jian-cui/blog/tree/ssr)。正好想借这次机会把自己在React学习过程记录下来，做一次总结。

可能大家也都听过很多遍SPA做SSR的原因主要有两点：
1. SEO问题
2. 提高首屏加载速度

这里会从SPA开始一步步讲到SSR

在这次实践过程中，遇到很多问题，列举如下：

1. 在SSR后如果保证HMR

   * 代码分隔后的组件也需要用``hot(module)(Component)``才能热更新

2. fetch问题

   * post的时候记得加上header content-type
     ``'Content-Type': 'application/json'``

3. reducer问题

   * reducer的hot loading需要新方法https://github.com/reactjs/react-redux/releases/tag/v2.0.0
   * store不能包含在render函数中<https://github.com/reactjs/react-redux/issues/775>

4. 在代码分割code splitting后，如何保证redux也是按需加载

5. SSR成功后，跳转页面，不申请新内容(即不调用fetch)

6. ``Promise``、``Async/Await``问题

7. ``DEHYDRATED_STATE``使用过一次后，要删除

8. 热加载模式下， ``webpackDevMiddleware.fileSystem.readFileSync``读取不到内存中的文件

   * 使用``connect-history-api-fallback``，直接使用``res.sendFile(path.join(__dirname, ../public/index.html'))``就可以了

## React + Redux + React-Router实现SPA代码分离

### 目录结构

我接触过的MVVM框架+状态管理工具目录结构主要有两种：

1. 组件与状态管理完全分开

   ![](/images/temp.png)

   上图是我很早之前的一个项目截图，当时用的是Vue + Vuex。
   随着项目的扩大，项目中的组件越来越多，你的Vuex目录也会变得越来越乱，尤其是某些组件根本就需要用状态管理，互相混杂在一起，非常头疼。

2. 组件与对应的状态管理放在一起，即按功能放在一起![](/images/temp2.png)


   按功能分类则不会出现上面的问题，所有的view、action、reducer等在同一个文件夹中，结构清晰，就算项目增长也不会出现问题。

  index.js内容：

  ```javascript
  // index.js
  import * as actions from './actions.js';	// 引入actions
  import reducer from './reducer.js';			// 引入reducer
  import view from './views/topMenu.js';		// 引入view
  import state from './state.js';				// 引入默认state

  // 所有index.js都有actions, reducer, view, state四项出口
  export {actions, reducer, view, state};
  ```

  ​

### 单页应用SPA

需要导入的组件

* react-router
* react-router-dom

router/routes.js

```javascript
export default [{
    path: '/',
    exact: true,
    component: ArticleList
  }, {
    path: '/post/:id',
    component: ArticleContent
}]
// 导出组件ArticleList和ArticleContent
```

router/index.js: 

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from '../App.js';
import routes from './routes.js';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <App>				// App为页面入口组件
          <Switch>
            {
              routes.map(route => {
                return <Route {...route} key={route.path} />
              })
            }
          </Switch>
        </App>
      </Router>
    );
  }
}

export default Routes;
```



### 状态管理redux

每个组件文件中的 `actions.js`, `actionTypes.js`, `reducer.js`, `state.js`分别对应redux中的Action、ActionType、Reducer、initState， 另外使用了`react-redux`来增强管理。



### 代码分割及异步加载

我们要实现的如下：

1. 按组件的代码分割及异步加载
2. 加上Redux后，组件的逻辑很大一部分转嫁到了Redux中，Redux也要异步加载

`react-router`中提供了一种[方案](https://reacttraining.com/react-router/web/guides/code-splitting)，即使用`react-hot-loader`，但是考虑到第2个需求，我们决定自己实现一个完全的按需加载组件，即高级组件`asyncComponentHOC`

webpack实现动态代码分割现在有[2种方式](https://webpack.js.org/guides/code-splitting/#dynamic-imports)

1. `import()` ECMAScript方案，**我们使用这一种**
2. `require.ensure` webpack自带方案

之间已经提到过，我们整个代码结构是按功能分类，那么我们也就按照功能来异步加载。

Redux的异步加载主要依靠`store.reset`, `store.reset`是Redux的一个增强器Store Enhancer, 用来替换整个Redux:

```javascript
const RESET_ACTION_TYPE = '@@RESET';

const resetReducerCreator = (reducer, resetState) => (state, action) => {
  if (action.type === RESET_ACTION_TYPE) {
    return resetState;
  } else {
    return reducer(state, action);
  }
}

const reset = (createStore) => (reducer, proloadState, enhancer) => {
  const store = createStore(reducer, proloadState, enhancer);
  const reset = (resetReducer, resetState) => {
    const newReducer = resetReducerCreator(resetReducer, resetState);
    // 替换reducer
    store.replaceReducer(newReducer);
	// 重置state
    store.dispatch({
      type: RESET_ACTION_TYPE,
      state: resetState
    });
  }
  
  // 返回一个新的store
  return {
    ...store,
    reset
  }
}

export default reset;
```



高级组件`asyncComponentHOC`见下：

```javascript
function asyncComponentHOC(importComponent) {
  return class extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        component: null
      }
      // 设置公用redux
      store.dispatch(commonActions.setId(props.match.params.id ? props.match.params.id : -1));
    }
    // 主要内容在componentWillMount，使用async/await来实现异步
    async componentWillMount() {
      const { view: component, stateKey: stateKey, reducer, state } = await importComponent();
      // 备份reducer
      store._reducers = {
        ...store._reducers,
        [stateKey]: reducer
      }
      // 重置redux
      store.reset(combineReducers({
        ...store._reducers
      }), {
        ...store.getState()
      })
      this.setState({
        component: component
      })
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        const id = nextProps.match.params.id
        store.dispatch(commonActions.setId(id));
      }
    }
    render() {
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props} /> : null;
    }
  }
}

// 按需加载的组件ArticleList
// import的第一个注释参数可以设置分割出来的文件名
const AsyncArticleList = asyncComponentHOC(() => import(/* webpackChunkName: "home" */ '../components/ArticleList/'));

```



### 热加载HMR

这块主要分为两部分

1. 普通代码的[热加载](https://webpack.js.org/guides/hot-module-replacement/)

2. [reducer的热加载](https://github.com/reactjs/react-redux/releases/tag/v2.0.0)

   ```javascript
   // Store.js:
   if (module.hot) {
     // Enable Webpack hot module replacement for reducers
     // 当Reducer.js发生更改时，重新导入reducer
     module.hot.accept('./Reducer.js', () => {
       const nextRootReducer = require('./Reducer.js').default;
       store.replaceReducer(nextRootReducer);
     });
   }
   ```



注意： 

**css如果不是集成到js中，则不能热加载**



### 服务器端渲染SSR

服务器端渲染SSR主要分为以下几步：

1. 在服务器内部获取初始数据

   使用``react-router-dom``中的``matchPath``函数判断路由，获取数据

   **注意**：此时要将所有组件的初始数据都获取到，所有组件要做修改，即将初始的``fetch``设为静态方法，供服务器调用

2. ``ReactDOMServer.renderToString()``将请求的页面渲染出来

3. 将初始数据放入到页面的``DEHYDRATED_STATE``参数中

4. 组件除去将异步``fetch``设置为静态方法外，还要判断是否有``DEHYDRATED_STATE``。若无，则调用fetch重新获取数据(防止页面内跳转后数据一直为空)

   ``asyncComponentHOC``更新为：

   ```javascript
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
   	  // 增加判断初始数据的代码
         const dehydratedState = (win && win.DEHYDRATED_STATE);
         const oldState = store.getState();
         const mergedState = {...dehydratedState, ...oldState};
   	  // 如果没有，则调用组件静态方法fetch数据
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
   ```


5. api接口处修改

   在react中判断接口是在服务器还是页面中请求，如果是在服务器中，则需要添加**域名前缀**

   ```javascript
   // redux-common.js
   // 判断是否服务器渲染
   const __SERVER__ = typeof window == 'object' ? false : true;
   const SERVER = __SERVER__ ? 'http://www.jiancui.net' : '';
   const state = {
     api: {
       list: `${SERVER}/api/articleList`,
       content: `${SERVER}/api/articleContent`
     }
   }
   ```

   ​





__注意__：写的有点仓促，所以很多细节没有详细描述，可以对应我的[代码](https://github.com/jian-cui/blog/tree/ssr)来看，有没明白的可以发[邮件](mailto:jiancui1990@163.com)问我。


在实现过程中参考学了很多网络及书上的资料，参考见下:
> 1. [《深入浅出React和Redux》-程墨](https://book.douban.com/subject/27033213/)
> 1. [搭建React服务端渲染项目知识梳理及总结](http://www.yyyweb.com/5020.html)
> 2. [使用React SSR构建Isomorphic应用](http://luoxia.me/code/2017/02/07/%E4%BD%BF%E7%94%A8React%20SSR%E6%9E%84%E5%BB%BAIsomorphic%E5%BA%94%E7%94%A8/)
> 3. [React Router v4 之代码分割：从放弃到入门](http://www.wukai.me/2017/09/25/react-router-v4-code-splitting/)
> 4. [React16+Redux+Router4+Koa+Webpack3服务器端渲染（按需加载，热更新）](http://react-china.org/t/react16-redux-router4-koa-webpack3/16846)
> 5. [Koa2 + React + Redux + antd 同构直出探索](http://coderlt.coding.me/2016/11/25/isomorphism-koa2-react-antd/)