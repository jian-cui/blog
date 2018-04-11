import fetch from 'isomorphic-fetch';
import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAIL } from './actionTypes.js';

export const fetchArticlesStarted = () => ({
  type: FETCH_STARTED
})

export const fetchArticlesSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchArticlesFail = (error) => ({
  type: FETCH_FAIL,
  error
})

export const fetchArticles = () => {
  return (dispatch, getState) => {
    // const __SERVER__ = typeof window == 'object' ? false : true;
    // const api = __SERVER__ ? 'http://localhost:3000/api/articleList' : '/api/articleList';
    const state = getState();
    const lock = state.articleList.lock;
    const page = state.articleList.page;
    const api = state.common.api.list;
    if (!lock) {
      dispatch(fetchArticlesStarted());
      // 记得返回fetch
      return fetch(api, {
        method: 'POST',
        // credentials: 'include',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          page: page
        })
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error('Fail to get response width status ' + res.status);
        }
        // 此处要将Promise返回
        return res.json().then(data => {
          dispatch(fetchArticlesSuccess(data));
        }).catch(err => {
          throw new Error('JSON转换不对');
        })
      }).catch(error => {
        dispatch(fetchArticlesFail(error));
      })
    }
  }
}