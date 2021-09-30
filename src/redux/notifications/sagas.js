import { call, put, take } from 'redux-saga/effects';
import { readDocuments } from 'src/utils/firebase';
import { notificationsRead } from './slice';

/** workers */
function* workNotificationsRead() {
  try {
    yield put(notificationsRead.pending());
    const entities = yield call(readDocuments('notifications'));
    yield put(notificationsRead.fulfilled(entities));
  } catch (error) {
    yield put(notificationsRead.rejected(error));
  }
}

/** watchers */
export function* watchNotificationsRead() {
  yield take(notificationsRead);
  yield call(workNotificationsRead);
}
