import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAIL } from './actionTypes.js';
import * as Status from './status.js';

export default (state = { status: Status.LOADING, list: [], page: 1 }, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return {...state, status: Status.LOADING, lock: true};
    case FETCH_SUCCESS:
      const list = [...state.list, ...action.result];
      return {status: Status.SUCCESS, list: list, lock: false, page: state.page+1};
    case FETCH_FAIL:
      return {...state, status: Status.FAIL, lock: false};
    default:
      return {...state}
  }
}