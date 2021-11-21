import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import {
  i18nReducer,
  instanceInitialized,
  languageChanged,
  localizationAccessible,
  resourcesAdded,
  translationAccessible,
} from 'redux/i18n/slice';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import {
  watchLocalizationAccessible,
  watchTranslationAccessible,
} from 'redux/i18n/sagas';

const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

export const store: EnhancedStore<any> = configureStore({
  reducer: {
    i18n: i18nReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          instanceInitialized.toString(),
          resourcesAdded.toString(),
          languageChanged.toString(),
          localizationAccessible.toString(),
          translationAccessible.toString(),
        ],
        ignoredPaths: ['i18n.instance'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchLocalizationAccessible);
sagaMiddleware.run(watchTranslationAccessible);

export type RootState = ReturnType<typeof store.getState>;
