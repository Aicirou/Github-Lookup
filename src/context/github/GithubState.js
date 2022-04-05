import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import * as Types from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();

    const url = `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const res = await axios.get(url);

    dispatch({
      type: Types.SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  const getUser = async username => {
    setLoading();
    const url = `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const res = await axios.get(url);

    dispatch({
      type: Types.GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  const getUserRepos = async username => {
    setLoading();

    const url = `https://api.github.com/users/${username}/repos?per_page=15&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const res = await axios.get(url);

    dispatch({
      type: Types.GET_REPOS,
      payload: res.data,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: Types.CLEAR_USERS });
  // Set Loading
  const setLoading = () => dispatch({ type: Types.SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
