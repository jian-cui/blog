/**
 * 公用Reducer，例如
 *    页面ID
 */

const stateKey = 'common';

const actionTypes = {
  COMMON_ID: 'common/id'
}

const actions = {
  setId: (id) => ({
    type: actionTypes.COMMON_ID,
    id: id
  })
}

// 判断是否服务器渲染
const __SERVER__ = typeof window == 'object' ? false : true;
const SERVER = __SERVER__ ? 'http://localhost:3000' : '';
const state = {
  api: {
    list: `${SERVER}/api/articleList`,
    content: `${SERVER}/api/articleContent`
  }
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.COMMON_ID:
      return { ...state,  id: action.id };
    default:
      return { ...state };
  }
}

export {stateKey, actionTypes, actions, reducer, state}