import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAIL } from './actionTypes.js';
import * as Status from './status.js';

const initState = {
  status: Status.LOADING
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return { status: Status.LOADING };
    case FETCH_SUCCESS:
      const list = action.data;
      return {status: Status.SUCCESS, list: list };
    case FETCH_FAIL:
      return { status: Status.FAIL };
    default:
      return state;
  }
}