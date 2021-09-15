import { take, call, put } from 'redux-saga/effects';
import { createLifecycleActions } from 'src/redux/utils';
import { readDocuments } from 'src/utils/firebase';

export const authorsRead = createLifecycleActions('authors/authorsRead');

function* workAuthorsRead() {
  try {
    yield put(authorsRead.pending());
    const authors = yield call(readDocuments, 'authors');
    yield put(authorsRead.fulfilled(authors));
  } catch (error) {
    yield put(authorsRead.rejected(error));
  }
}

export function* watchAuthorsRead() {
  yield take(authorsRead)
  yield call(workAuthorsRead)
}

