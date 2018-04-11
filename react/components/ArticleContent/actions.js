import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAIL } from './actionTypes.js';

export const fetchContentStarted = () => ({
  type: FETCH_STARTED
})

export const fetchContentSuccess = (html) => ({
  type: FETCH_SUCCESS,
  html: html
})

export const fetchContentFail = (error) => ({
  type: FETCH_FAIL,
  error
})

export const fetchContent = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const api = state.common.api.content
    dispatch(fetchContentStarted());
    // 记得返回fetch
    return fetch(api, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error('Fail to get response width status ' + res.status);
      }
      // 此处要将Promise返回
      return res.json().then((responseJson) => {
        dispatch(fetchContentSuccess(responseJson.html));
      }).catch(error => {
        throw new Error('Invalid json repsonse: ' + error);
      })
    }).catch(error => {
      dispatch(fetchContentFail(error));
    })
  }
}