import { i18nAccessible, selectTranslation } from 'redux/i18n/slice';
import { SagaIterator } from 'redux-saga';
import { put, select, take } from 'redux-saga/effects';

import { pagesInternationalized } from './slice';

/** watchers */
export function* watchPagesInternationalized(): SagaIterator {
  while (true) {
    yield take(i18nAccessible);
    const t = yield select(selectTranslation);
    yield put(pagesInternationalized(t));
  }
}
