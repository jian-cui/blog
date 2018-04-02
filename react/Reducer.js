import {combineReducers} from 'redux';
import {reducer as topMenuReducer} from './components/TopMenu';
// import {reducer as articleListReducer} from './components/ArticleList';
// import {reducer as articleContentReducer} from './components/ArticleContent';
export const originalReducer = {
  topMenu: topMenuReducer,
  // articleList: articleListReducer,
  // articleContent: articleContentReducer
}
const reducer = combineReducers(originalReducer)

export default reducer;