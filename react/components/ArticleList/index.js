import * as actions from './actions.js';
import reducer from './reducer.js';
import view, {stateKey} from './views/list.js';
import state from './state.js';
import {hot} from 'react-hot-loader';

let hotView = view;
if (process.env.HOT === true) {
  hotView = hot(module)(view);
}

export {
  actions, 
  reducer, 
  stateKey, 
  state,
  hotView as view
};