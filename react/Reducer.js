import {combineReducers} from 'redux';
import {reducer as topMenuReducer} from './components/TopMenu';
import {reducer as articleListReducer} from './components/ArticleList';
import {reducer as articleContentReducer} from './components/ArticleContent';

const reducer = combineReducers({
  topMenu: topMenuReducer,
  articleList: articleListReducer,
  articleContent: articleContentReducer
})

export default reducer;