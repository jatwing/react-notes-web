import { put, take } from 'redux-saga/effects';
import { translationAccessible } from 'src/redux/i18n/slice';

import { pagesTranslated } from './slice';

/** watchers */
export function* watchPagesTranslated() {
  while (true) {
    const { payload: t } = yield take(translationAccessible);
    yield put(pagesTranslated(t));
  }
}
