import { ACTIVE_TOPMENU } from './actionTypes.js';

export const activeTopMenu = (index) => ({
  type: ACTIVE_TOPMENU,
  activeIndex: index
})