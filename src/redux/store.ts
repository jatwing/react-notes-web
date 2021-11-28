import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { watchAuthorRead } from 'redux/author/sagas';
import { authorReducer } from 'redux/author/slice';
import {
  watchLocalizationAccessible,
  watchTranslationAccessible,
} from 'redux/i18n/sagas';
import {
  i18nReducer,
  instanceInitialized,
  languageChanged,
  localizationAccessible,
  resourcesAdded,
  translationAccessible,
} from 'redux/i18n/slice';
import { watchNotificationsRead } from 'redux/notifications/sagas';
import {
  notificationsReducer,
  notificationsTranslated,
} from 'redux/notifications/slice';
import { watchProjectRead } from 'redux/project/sagas';
import { projectLocalized, projectReducer } from 'redux/project/slice';
import { watchRankingsRead } from 'redux/rankings/sagas';
import { rankingsRead, rankingsReducer } from 'redux/rankings/slice';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

export const store: EnhancedStore<any> = configureStore({
  reducer: {
    author: authorReducer,
    i18n: i18nReducer,
    notifications: notificationsReducer,
    project: projectReducer,
    rankings: rankingsReducer,
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
          notificationsTranslated.toString(),
          projectLocalized.toString(),
          rankingsRead.settled.toString(),
        ],
        ignoredPaths: ['i18n.instance'],
      },
    }).concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(watchAuthorRead);
sagaMiddleware.run(watchLocalizationAccessible);
sagaMiddleware.run(watchTranslationAccessible);
sagaMiddleware.run(watchNotificationsRead);
sagaMiddleware.run(watchProjectRead);
sagaMiddleware.run(watchRankingsRead);
