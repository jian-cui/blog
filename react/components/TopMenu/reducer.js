import { ACTIVE_TOPMENU } from './actionTypes.js';

export default (state = [], action) => {
  switch (action.type) {
    case ACTIVE_TOPMENU:
      const { activeIndex } = action
      return state.map((item, index) => {
        const activeBool = index === activeIndex ? true : false;
        return { ...item, actived: activeBool };
      })
    default:
      return state
  }
}