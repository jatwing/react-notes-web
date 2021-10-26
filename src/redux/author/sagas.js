import { call, put, take } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { authorRead } from './slice';

/** workers */
function* workAuthorRead() {
  try {
    yield put(authorRead.pending());
    const entities = yield call(readDocuments('authors'));
    yield put(authorRead.fulfilled(entities[0]));
  } catch (error) {
    yield put(authorRead.rejected(error));
  }
}

/** watchers */
export function* watchAuthorRead() {
  yield take(authorRead);
  yield call(workAuthorRead);
}
