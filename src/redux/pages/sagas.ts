import { i18n, TFunction } from 'i18next';
import { put, select, take } from 'redux-saga/effects';
import { selectTranslation, translationAccessible } from 'redux/i18n/slice';
import { SagaIterator } from 'redux-saga';
import { pagesTranslated } from './slice';

/** watchers */
export function* watchPagesTranslated(): SagaIterator {
  while (true) {
    yield take(translationAccessible);
    const instance: i18n = yield select(selectTranslation);
    yield put(pagesTranslated(instance.t));
  }
}
