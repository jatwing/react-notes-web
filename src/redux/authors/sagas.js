import { call, put, take } from 'redux-saga/effects';
import { createLifecycleActions } from 'src/redux/utils';
import { readDocuments } from 'src/utils/firebase';

export const authorsRead = createLifecycleActions('authors/authorsRead');

function* workAuthorsRead() {
  try {
    yield put(authorsRead.pending());
    const entities = yield call(readDocuments('authors', true));
    yield put(authorsRead.fulfilled(entities));
  } catch (error) {
    yield put(authorsRead.rejected(error));
  }
}

export function* watchAuthorsRead() {
  yield take(authorsRead);
  yield call(workAuthorsRead);
}
