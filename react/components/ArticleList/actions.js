import fetch from 'isomorphic-fetch';
import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAIL } from './actionTypes.js';
import API from '../../api.js';

export const fetchArticlesStarted = () => ({
  type: FETCH_STARTED
})

export const fetchArticlesSuccess = (data) => ({
  type: FETCH_SUCCESS,
  data
})

export const fetchArticlesFail = (error) => ({
  type: FETCH_FAIL,
  error
})

export const fetchArticles = () => {
  return (dispatch) => {
    // const state = getState();
    // const lock = state.articleList.lock;
    // const page = state.articleList.page;
    // const api = state.api.list;

    dispatch(fetchArticlesStarted());
    // 记得返回fetch
    return fetch(API.list, {
      method: 'POST',
      // credentials: 'include',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // page: page
      })
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error('Fail to get response width status ' + res.status);
      }
      // 此处要将Promise返回
      return res.json()
    }).then(data => {
      dispatch(fetchArticlesSuccess(data));
    }).catch(err => {
      dispatch(fetchArticlesFail('数据出错'))
    })
  }
}