import types from '../static/reduxTypes';

const fetchPosts = () => ({
  type: types.POSTS_FETCH_REQUESTED,
});

const postsDataReceived = payload => ({
  type: types.POSTS_FETCH_SUCCEEDED,
  payload,
});

export default {
  fetchPosts,
  postsDataReceived,
};
