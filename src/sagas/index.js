import { fork, all } from 'redux-saga/effects';

import * as postsSaga from './fetchPosts';
import * as commentsSaga from './fetchComments';

function* rootSaga() {
  yield all(
    [
      ...Object.values(postsSaga),
      ...Object.values(commentsSaga),
    ].map(fork),
  );
}

export default rootSaga;
