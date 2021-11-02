import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchAuthorRead } from 'src/redux/author/sagas';
import { authorReducer } from 'src/redux/author/slice';
import {
  watchLocalizationAccessible,
  watchTranslationAccessible,
} from 'src/redux/i18n/sagas';
import {
  instanceInitialized,
  languageChanged,
  localizationAccessible,
  resourcesAdded,
  translationAccessible,
  i18nReducer,
} from 'src/redux/i18n/slice';
import { watchNotificationsRead } from 'src/redux/notifications/sagas';
import {
  notificationsReducer,
  notificationsTranslated,
} from 'src/redux/notifications/slice';
import { pagesReducer } from 'src/redux/pages/slice';
import { watchProjectRead } from 'src/redux/project/sagas';
import { projectLocalized, projectReducer } from 'src/redux/project/slice';
import { watchRankingsRead } from 'src/redux/rankings/sagas';
import { rankingsRead, rankingsReducer } from 'src/redux/rankings/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    author: authorReducer,
    i18n: i18nReducer,
    notifications: notificationsReducer,
    pages: pagesReducer,
    project: projectReducer,
    rankings: rankingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          instanceInitialized.toString(),
          resourcesAdded.toString(),
          languageChanged.toString(),
          translationAccessible.toString(),
          localizationAccessible.toString(),
          notificationsTranslated.toString(),
          projectLocalized.toString(),
          rankingsRead.settled.toString(),
        ],
        ignoredPaths: ['i18n.t', 'i18n.l'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthorRead);
sagaMiddleware.run(watchTranslationAccessible);
sagaMiddleware.run(watchLocalizationAccessible);
sagaMiddleware.run(watchNotificationsRead);
sagaMiddleware.run(watchProjectRead);
sagaMiddleware.run(watchRankingsRead);
