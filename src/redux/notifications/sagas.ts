import axios from 'axios';
import {
  i18nAccessible,
  selectLocalization,
  selectTranslation,
} from 'redux/i18n/slice';
import { SagaIterator } from 'redux-saga';
import { all, call, put, select, take } from 'redux-saga/effects';

import { notificationsInternationalized, notificationsRead } from './slice';

/** workers */
function* workNotificationsRead(): SagaIterator {
  try {
    yield put(notificationsRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/notifications'),
    );
    yield put(notificationsRead.fulfilled(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(notificationsRead.rejected(error.toString()));
    }
  }
}

/** watchers */
export function* watchNotificationsRead(): SagaIterator {
  yield all([take(notificationsRead), take(i18nAccessible)]);
  yield call(workNotificationsRead);
  const l = yield select(selectLocalization);
  const t = yield select(selectTranslation);
  yield put(notificationsInternationalized({ l, t }));
  while (true) {
    yield take(i18nAccessible);
    const l = yield select(selectLocalization);
    const t = yield select(selectTranslation);
    yield put(notificationsInternationalized({ l, t }));
  }
}
