import types from '../static/reduxTypes';

const addCommentsToPost = (id, payload) => ({
  type: types.ADD_COMMENTS_TO_POST,
  id,
  payload,
});

const addNewCommentToPost = (id, payload) => ({
  type: types.ADD_NEW_COMMENT_TO_POST,
  id,
  payload,
});

export default {
  addCommentsToPost,
  addNewCommentToPost,
};
