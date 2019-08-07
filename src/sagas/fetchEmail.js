import { put, takeLatest } from 'redux-saga/effects';
import types from '../static/reduxTypes';
import getEmail from '../services/getEmailAPI';

function* fetchEmail() {
  try {
    const email = yield getEmail();

    yield put({
      type: types.USER_EMAIL_FETCH_SUCCEEDED,
      payload: email,
    });
  } catch (error) {
    yield put({
      type: types.USER_EMAIL_FETCH_FAILED,
      payload: error,
    });
  }
}

function* fetchEmailActionWatcher() {
  yield takeLatest(types.POSTS_FETCH_SUCCEEDED, fetchEmail);
}

export default fetchEmailActionWatcher;
