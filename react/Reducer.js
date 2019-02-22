import {combineReducers} from 'redux';
// import { reducer as commonReducer} from './redux.common.js';
import {reducer as topMenuReducer} from './components/TopMenu';
// import {reducer as articleListReducer} from './components/ArticleList';
// import {reducer as articleContentReducer} from './components/ArticleContent';


export const initReducer = {
  topMenu: topMenuReducer,
}

export default combineReducers(initReducer);