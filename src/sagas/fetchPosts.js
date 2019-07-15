import { put, takeLatest, all } from 'redux-saga/effects';
import types from '../static/reduxTypes';

function* fetchPosts() {
  const posts = yield fetch('https://jsonplaceholder.typicode.com/posts').then(
    response => response.json(),
  );

  yield put({ type: types.POSTS_RECEIVED, payload: posts });
}

function* actionWatcher() {
	yield takeLatest()
}
