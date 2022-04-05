import * as Types from '../types';

export default (state, action) => {
  switch (action.type) {
    case Types.CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };

    case Types.GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case Types.GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };

    case Types.SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case Types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
