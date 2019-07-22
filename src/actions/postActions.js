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

export default {
  fetchPosts,
  addCommentsToPost,
};
