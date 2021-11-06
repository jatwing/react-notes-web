import { put, take, select } from 'redux-saga/effects';
import { translationAccessible } from 'src/redux/i18n/slice';
import { pagesTranslated } from './slice';
import { selectTranslation } from 'src/redux/i18n/slice';

/** watchers */
export function* watchPagesTranslated() {
  yield take(translationAccessible);
  const t = yield select(selectTranslation);
  yield put(pagesTranslated(t));
}
