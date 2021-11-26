import { put, take } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import {
  instanceInitialized,
  languageChanged,
  localizationAccessible,
  resourcesAdded,
  translationAccessible,
} from './slice';
import { i18n } from 'i18next';

/** watchers */
export function* watchTranslationAccessible(): SagaIterator {
  yield take(instanceInitialized);
  const { payload }: { payload: i18n } = yield take(resourcesAdded);
  yield put(translationAccessible(payload as i18n));
  while (true) {
    const { payload }: { payload: i18n } = yield take(languageChanged);
    yield put(translationAccessible(payload));
  }
}

export function* watchLocalizationAccessible(): SagaIterator {
  const { payload }: { payload: i18n } = yield take(instanceInitialized);
  yield put(localizationAccessible(payload));
  while (true) {
    const { payload }: { payload: i18n } = yield take(languageChanged);
    yield put(localizationAccessible(payload));
  }
}
