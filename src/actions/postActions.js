import types from '../static/reduxTypes';

const fetchPosts = (start, limit) => ({
  type: types.POSTS_FETCH_REQUESTED,
  start,
  limit,
});

const setPostsLoadedFlag = flag => ({
  type: types.SET_POSTS_LOADED_FLAG,
  flag,
});

const addNamesToPosts = payload => ({
  type: types.ADD_NAMES_TO_POSTS,
  payload,
});

const toggleFavouritePost = (id, payload) => ({
  type: types.TOGGLE_FAVOURITE_POST,
  id,
  payload,
});

export default {
  fetchPosts,
  setPostsLoadedFlag,
  addNamesToPosts,
  toggleFavouritePost,
};
