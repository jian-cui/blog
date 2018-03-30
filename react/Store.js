import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {reducer as topMenuReducer} from './components/TopMenu';
import {reducer as articleListReducer} from './components/ArticleList';
import {reducer as articleContentReducer} from './components/ArticleContent';

import reduxImmutableState from 'redux-immutable-state-invariant';

const win = window;
const reducer = combineReducers({
  topMenu: topMenuReducer,
  articleList: articleListReducer,
  articleContent: articleContentReducer
})

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(reduxImmutableState());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const initialState = {
  // api: {
  //   fetchArticles: '/api/articleList'
  // },
  topMenu: [{
    name: 'CSS3',
    link: '/post/1',
    key: 'css3',
    active: false
  }, {
    name: 'Javascript',
    link: '/post/2',
    key: 'js',
    active: false
  }, {
    name: 'React',
    link: '/',
    key: 'react',
    active: false
  }, {
    name: 'Vue',
    link: '/',
    key: 'vue',
    active: false
  }],
  articleList: {
    lock: false,
    page: 1,
    list: []
  },
  articleContent: {
    html: ''
  }
};

export default createStore(reducer, initialState, storeEnhancers);