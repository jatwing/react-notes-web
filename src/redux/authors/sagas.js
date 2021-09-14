import { take, call, put } from 'redux-saga/effects';
import { createLifecycleActions } from 'src/redux/helpers';
import { readDocuments } from 'src/utils/firebase';

export const authorsReadActions = createLifecycleActions('authors/authorsRead');

function* workAuthorsRead() {
  try {
    yield put(authorsReadActions.pending());
    const authors = yield call(readDocuments('authors'));
    yield put(authorsReadActions.fulfilled(authors));
  } catch (error) {
    yield put(authorsReadActions.rejected(error));
  }
}

export function* watchAuthorsRead() {
  yield take(authorsReadActions.typePrefix)
  yield call(workAuthorsRead)

 // yield takeLatest(authorsReadActions.typePrefix, workAuthorsRead);
}
