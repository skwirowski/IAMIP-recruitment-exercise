import { put, takeLatest } from 'redux-saga/effects';
import types from '../static/reduxTypes';
import getComments from '../services/getCommentsAPI';

function* fetchComments(action) {
  try {
    const comments = yield getComments(action.id);
    yield put({
      type: types.COMMENTS_FETCH_SUCCEEDED,
      payload: comments,
    });
  } catch (error) {
    yield put({
      type: types.COMMENTS_FETCH_FAILED,
      payload: error,
    });
  }
}

function* fetchCommentsActionWatcher() {
  yield takeLatest(types.COMMENTS_FETCH_REQUESTED, fetchComments);
}

export default fetchCommentsActionWatcher;
