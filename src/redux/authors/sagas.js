import { takeLatest, call, put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'src/utils/firebase';
import { createLifecycleActions } from 'src/redux/helpers';
import { readDocuments } from 'src/utils/firebase';

export const authorsReadActions = createLifecycleActions('authors/authorsRead');


export const authorsFetched = createAction('authors/authorsFetched');
export const authorsFetchedPending = createAction(
  'authors/authorsFetched/pending'
);
export const authorsFetchedFulfilled = createAction(
  'authors/authorsFetched/fulfilled'
);
export const authorsFetchedRejected = createAction(
  'authors/authorsFetched/rejected',
  (error) => ({ error })
);

const fetchAuthors = async () => {
  const col = collection(db, 'authors');
  const snapshot = await getDocs(col);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

function* workAuthorsFetched() {
  try {
    yield put(authorsFetchedPending());
    const authors = yield call(fetchAuthors);
    yield put(authorsFetchedFulfilled(authors));
  } catch (error) {
    yield put(authorsFetchedRejected(error));
  }
}

export function* watchAuthorsFetched() {
  yield takeLatest(authorsFetched, workAuthorsFetched);
}

const readAuthors = async() => {
  const col = collection(db, 'authors');
  const snapshot = await getDocs(col);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

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
  yield takeLatest(authorsReadActions.typePrefix, workAuthorsRead);
}



