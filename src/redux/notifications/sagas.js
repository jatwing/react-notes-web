import { all, call, put, take } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';
import { translationAccessible } from 'src/redux/i18n/slice';

import { notificationsRead, notificationsTranslated } from './slice';

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
  const [_, { payload: t }] = yield all([
    take(notificationsRead),
    take(translationAccessible),
  ]);
  yield call(workNotificationsRead);
  yield put(notificationsTranslated(t));
  while (true) {
    const { payload: t } = yield take(translationAccessible);
    yield put(notificationsTranslated(t));
  }
}
