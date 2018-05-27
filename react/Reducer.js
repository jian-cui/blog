import {combineReducers} from 'redux';
import {stateKey as commonStateKey, reducer as commonReducer} from './redux.common.js';
import {reducer as topMenuReducer} from './components/TopMenu';
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