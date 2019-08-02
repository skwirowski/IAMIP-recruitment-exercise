import { fork, all } from 'redux-saga/effects';

import * as postsSaga from './fetchPosts';
import * as userEmailSaga from './fetchEmail';

function* rootSaga() {
  yield all(
    [
      ...Object.values(postsSaga),
      ...Object.values(userEmailSaga),
    ].map(fork),
  );
}

export default rootSaga;
