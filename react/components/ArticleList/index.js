import * as actions from './actions.js';
import reducer from './reducer.js';
import view from './views/index.js';
// import state from './state.js';
import { hot } from 'react-hot-loader/root';

const hotView = hot(view)

const key = 'articleList';

export {
  actions,
  reducer, 
  key,
  // state,
  hotView as view
};