import { take, put } from 'redux-saga/effects'
import { pagesTranslated } from './slice';
import { translationAccessible } from 'src/redux/i18n/slice';

/** watchers */
export function* watchPagesTranslated() {
  while (true) {
    const { payload: t } = yield take(translationAccessible);
    yield put(pagesTranslated(t));
  }
}
