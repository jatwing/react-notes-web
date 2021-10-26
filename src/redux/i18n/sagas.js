import {
  instanceInitialized,
  resourcesAdded,
  languageChanged,
  translationAccessible,
  localizationAccessible,
} from './slice';
import { put, take } from 'redux-saga/effects';

/** watchers */
export function* watchTranslationAccessible() {
  yield take(instanceInitialized);
  const { payload: t } = yield take(resourcesAdded);
  yield put(translationAccessible(t));
  while (true) {
    const {
      payload: { t },
    } = yield take(languageChanged);
    yield put(translationAccessible(t));
  }
}

export function* watchLocalizationAccessible() {
  const { payload: l } = yield take(instanceInitialized);
  yield put(localizationAccessible(l));
  while (true) {
    const {
      payload: { l },
    } = yield take(languageChanged);
    yield put(localizationAccessible(l));
  }
}
