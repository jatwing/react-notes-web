import { put, select, take } from 'redux-saga/effects';
import { selectTranslation, translationAccessible } from 'src/redux/i18n/slice';

import { pagesTranslated } from './slice';

/** watchers */
export function* watchPagesTranslated() {
  yield take(translationAccessible);
  const t = yield select(selectTranslation);
  yield put(pagesTranslated(t));
}
