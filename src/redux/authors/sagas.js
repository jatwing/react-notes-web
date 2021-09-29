import { call, put, take } from 'redux-saga/effects';
import { readDocuments } from 'src/utils/firebase';
import { authorsRead } from './slice'

function* workAuthorsRead() {
  try {
    yield put(authorsRead.pending());
    const entities = yield call(readDocuments('authors'));
    yield put(authorsRead.fulfilled(entities));
  } catch (error) {
    yield put(authorsRead.rejected(error));
  }
}

export function* watchAuthorsRead() {
  yield take(authorsRead);
  yield call(workAuthorsRead);
}
