import types from '../static/reduxTypes';

const fetchPosts = (start, limit) => ({
  type: types.POSTS_FETCH_REQUESTED,
  start,
  limit,
});

const addCommentsToPost = (id, payload) => ({
  type: types.ADD_COMMENTS_TO_POST,
  id,
  payload,
});

const setCommentsFetchLoader = (id, payload) => ({
  type: types.SET_COMMENTS_FETCH_LOADER,
  id,
  payload,
});

const toggleFavouritePost = (id, payload) => ({
  type: types.TOGGLE_FAVOURITE_POST,
  id,
  payload,
});

const setFavouritePosts = ids => ({
  type: types.SET_FAVOURITE_POSTS,
  ids,
});

export default {
  fetchPosts,
  addCommentsToPost,
  setCommentsFetchLoader,
  toggleFavouritePost,
  setFavouritePosts,
};
