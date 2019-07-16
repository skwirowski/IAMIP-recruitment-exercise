import types from '../static/reduxTypes';

const fetchPosts = (start, end) => ({
  type: types.POSTS_FETCH_REQUESTED,
  start,
  end,
});

const postsDataReceived = payload => ({
  type: types.POSTS_FETCH_SUCCEEDED,
  payload,
});

export default {
  fetchPosts,
  postsDataReceived,
};
