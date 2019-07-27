import { put, takeLatest } from 'redux-saga/effects';
import types from '../static/reduxTypes';
import getComments from '../services/getCommentsAPI';

function* fetchComments(action) {
  try {
    yield put({
      type: types.SET_COMMENTS_FETCH_LOADER,
      id: action.id,
      payload: true,
    });

    const comments = yield getComments(action.id);
    yield put({
      type: types.COMMENTS_FETCH_SUCCEEDED,
      payload: comments,
    });

    yield put({
      type: types.ADD_COMMENTS_TO_POST,
      id: action.id,
      payload: comments,
    });

    yield put({
      type: types.SET_COMMENTS_FETCH_LOADER,
      id: action.id,
      payload: false,
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
