import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAIL } from './actionTypes.js';
import * as Status from './status.js';

export default (state = { status: Status.LOADING }, action) => {
  switch (action.type) {
    case FETCH_STARTED: {
      return {...state, status: Status.LOADING};
    }
    case FETCH_SUCCESS: {
      return {...state, ...action, status: Status.SUCCESS};
    }
    case FETCH_FAIL: {
      return {...state, status: Status.FAIL};
    }
    default: {
      return state
    }
  }
}