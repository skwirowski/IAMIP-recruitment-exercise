import types from '../static/reduxTypes';

const fetchPosts = (start, limit) => ({
  type: types.POSTS_FETCH_REQUESTED,
  start,
  limit,
});

const fetchComments = id => ({
  type: types.COMMENTS_FETCH_REQUESTED,
  id,
});

const addNewCommentToPost = (id, payload) => ({
  type: types.ADD_NEW_COMMENT_TO_POST,
  id,
  payload,
});

const setNewCommentsToPost = (id, payload) => ({
  type: types.SET_NEW_COMMENTS_TO_POST,
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
  fetchComments,
  addNewCommentToPost,
  setNewCommentsToPost,
  toggleFavouritePost,
  setFavouritePosts,
};
