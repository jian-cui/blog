const RESET_ACTION_TYPE = '@@RESET';

const resetReducerCreator = (reducer, resetState) => (state, action) => {
  if (action.type === RESET_ACTION_TYPE) {
    return resetState;
  } else {
    return reducer(state, action);
  }
}

const reset = (createStore) => (reducer, proloadState, enhancer) => {
  const store = createStore(reducer, proloadState, enhancer);
  const reset = (resetReducer, resetState) => {
    const newReducer = resetReducerCreator(resetReducer, resetState);
    store.replaceReducer(newReducer);

    store.dispatch({
      type: RESET_ACTION_TYPE,
      state: resetState
    });
  }

  return {
    ...store,
    reset
  }
}

export default reset;