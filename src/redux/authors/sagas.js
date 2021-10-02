import { call, put, take } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { authorsRead } from './slice';

/** workers */
function* workAuthorsRead() {
  try {
    yield put(authorsRead.pending());
    const entities = yield call(readDocuments('authors'));
    yield put(authorsRead.fulfilled(entities));
  } catch (error) {
    yield put(authorsRead.rejected(error));
  }
}

/** watchers */
export function* watchAuthorsRead() {
  yield take(authorsRead);
  yield call(workAuthorsRead);
}
