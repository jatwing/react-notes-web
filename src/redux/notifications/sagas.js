import { all, call, put, take, select } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';
import { translationAccessible } from 'src/redux/i18n/slice';

import { notificationsRead, notificationsTranslated } from './slice';
import { selectTranslation } from 'src/redux/i18n/slice';

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
  yield all([take(notificationsRead), take(translationAccessible)]);
  yield call(workNotificationsRead);
  const t = yield select(selectTranslation);
  yield put(notificationsTranslated(t));
  while (true) {
    yield take(translationAccessible);
    const t = yield select(selectTranslation);
    yield put(notificationsTranslated(t));
  }
}
