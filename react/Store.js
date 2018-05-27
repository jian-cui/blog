import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import reducer, { originalReducer } from './Reducer.js';
import reduxImmutableState from 'redux-immutable-state-invariant';
import resetEnhancer from './enhancers/reset.js';
import { state as commonState, stateKey as commonStateKey } from './redux.common.js';
import { state as topMenuState } from './components/TopMenu';

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(reduxImmutableState());
}

const win = global.window;;
const storeEnhancers = compose(
  resetEnhancer,
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

// 初始State
const initialState = {
  [commonStateKey]: commonState,
  topMenu: topMenuState
  // [articleListKey]: articleListState,
  // [articleContentKey]: articleContentState
};
// export default createStore(reducer, initialState, storeEnhancers);

// https://github.com/reactjs/react-redux/releases/tag/v2.0.0
// export default function configureStore() {
//   const store = createStore(reducer, initialState, storeEnhancers);

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('./Reducer.js', () => {
//       const nextRootReducer = require('./Reducer.js').default;
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//   // store._reducers = reducer;
//   return store;
// }
const store = createStore(reducer, initialState, storeEnhancers);

// https://github.com/reactjs/react-redux/releases/tag/v2.0.0
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./Reducer.js', () => {
    const nextRootReducer = require('./Reducer.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

store._reducers = originalReducer;
export default store;