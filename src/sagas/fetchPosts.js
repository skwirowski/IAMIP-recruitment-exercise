import { put, takeLatest } from 'redux-saga/effects';
import types from '../static/reduxTypes';
import getPosts from '../services/getPostsAPI';

function* fetchPosts() {
  try {
    const posts = yield getPosts();
    yield put({
      type: types.POSTS_FETCH_SUCCEEDED,
      payload: posts,
    });
  } catch (error) {
    yield put({
      type: types.POSTS_FETCH_FAILED,
      payload: error,
    });
  }
}

function* fetchPostsActionWatcher() {
  yield takeLatest(types.POSTS_FETCH_REQUESTED, fetchPosts);
}

export default fetchPostsActionWatcher;
