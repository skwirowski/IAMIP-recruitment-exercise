import types from '../static/reduxTypes';

const fetchPosts = (start, limit) => ({
  type: types.POSTS_FETCH_REQUESTED,
  start,
  limit,
});

const postsDataReceived = payload => ({
  type: types.POSTS_FETCH_SUCCEEDED,
  payload,
});

export default {
  fetchPosts,
  postsDataReceived,
};
