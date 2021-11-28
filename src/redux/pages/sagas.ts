import { i18n, TFunction } from 'i18next';
import { selectTranslation, translationAccessible } from 'redux/i18n/slice';
import { SagaIterator } from 'redux-saga';
import { put, select, take } from 'redux-saga/effects';

import { pagesTranslated } from './slice';

/** watchers */
export function* watchPagesTranslated(): SagaIterator {
  while (true) {
    yield take(translationAccessible);
    const t: TFunction = yield select(selectTranslation);
    yield put(pagesTranslated(t));
  }
}
