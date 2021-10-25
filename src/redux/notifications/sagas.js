import { call, put } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { notificationsRead, notificationsLocalized } from './slice';
import { watchEntitiesOperationWithLocalization } from 'src/redux/i18n/sagas';

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
  yield watchEntitiesOperationWithLocalization(
    notificationsRead,
    workNotificationsRead,
    notificationsLocalized
  )
}

