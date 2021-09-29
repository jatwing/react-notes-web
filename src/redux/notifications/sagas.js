import { call, put, take } from 'redux-saga/effects';
import { readDocuments } from 'src/utils/firebase';
import { notificationsRead } from './slice';

function* workNotificationsRead() {
  try {
    yield put(notificationsRead.pending());
    const entities = yield call(readDocuments('notifications'));
    yield put(notificationsRead.fulfilled(entities));
  } catch (error) {
    yield put(notificationsRead.rejected(error));
  }
}

export function* watchNotificationsRead() {
  yield take(notificationsRead);
  yield call(workNotificationsRead);
}
