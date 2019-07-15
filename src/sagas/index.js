import { fork, all } from 'redux-saga/effects';

import * as postsSaga from './fetchPosts';

function* rootSaga() {
  yield all(
    [...Object.values(postsSaga)].map(fork),
  );
}

export default rootSaga;
