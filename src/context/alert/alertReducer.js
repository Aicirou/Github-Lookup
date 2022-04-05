import * as Types from '../types';

export default (state, action) => {
  switch (action.type) {
    case Types.SET_ALERT:
      return action.payload;

    case Types.REMOVE_ALERT:
      return null;

    default:
      return state;
  }
};
