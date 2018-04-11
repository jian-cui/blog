import {combineReducers} from 'redux';
import {reducer as topMenuReducer} from './components/TopMenu';
import {stateKey as commonStateKey, reducer as commonReducer} from './redux.common.js';
// import {reducer as articleListReducer} from './components/ArticleList';
// import {reducer as articleContentReducer} from './components/ArticleContent';
export const originalReducer = {
  [commonStateKey]: commonReducer,
  topMenu: topMenuReducer,
  // articleList: articleListReducer,
  // articleContent: articleContentReducer
}
const reducer = combineReducers(originalReducer)

export default reducer;