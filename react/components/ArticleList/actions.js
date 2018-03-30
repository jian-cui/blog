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
    // const api = getState().api.fetchArticles;
    const api = '/api/articleList';
    const lock = getState().articleList.lock;
    const page = getState().articleList.page;
    if (!lock) {
      dispatch(fetchArticlesStarted());
      fetch(api, {
        method: 'POST',
        // credentials: 'include',
        headers:{
          "Content-Type": "application/json"
        },
        // body: `page=${page}`
        body: JSON.stringify({
          page: page
        })
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error('Fail to get response width status ' + res.status);
        }
        res.json().then((responseJson) => {
          dispatch(fetchArticlesSuccess(responseJson));
        }).catch(error => {
          throw new Error('Invalid json repsonse: ' + error);
        })
      }).catch(error => {
        dispatch(fetchArticlesFail(error));
      })
    }
  }
}