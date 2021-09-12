import { takeLatest, call, put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'src/utils/firebase';

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
    const data = yield call(fetchAuthors);
    yield put(authorsFetchedFulfilled(data));
  } catch (error) {
    yield put(authorsFetchedRejected(error));
  }
}

export function* watchAuthorsFetched() {
  yield takeLatest(authorsFetched, workAuthorsFetched);
}
