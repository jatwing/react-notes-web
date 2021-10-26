import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchAuthorsRead } from 'src/redux/authors/sagas';
import { authorsReducer } from 'src/redux/authors/slice';
import {
  instanceInitialized,
  resourcesAdded,
  languageChanged,
  translationAccessible,
  localizationAccessible,
} from 'src/redux/i18n/slice';
import {
  watchTranslationAccessible,
  watchLocalizationAccessible,
} from 'src/redux/i18n/sagas'
import { watchNotificationsRead } from 'src/redux/notifications/sagas';
import { notificationsReducer, notificationsTranslated } from 'src/redux/notifications/slice';
import { pagesReducer } from 'src/redux/pages/slice';
import { watchProjectsRead } from 'src/redux/projects/sagas';
import { projectsReducer, projectsLocalized } from 'src/redux/projects/slice';
import { watchRankingsRead } from 'src/redux/rankings/sagas';
import { rankingsReducer, rankingsRead } from 'src/redux/rankings/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    notifications: notificationsReducer,
    pages: pagesReducer,
    projects: projectsReducer,
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
          projectsLocalized.toString(),
          rankingsRead.settled.toString(),
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthorsRead);
sagaMiddleware.run(watchTranslationAccessible)
sagaMiddleware.run(watchLocalizationAccessible)
sagaMiddleware.run(watchNotificationsRead);
sagaMiddleware.run(watchProjectsRead);
sagaMiddleware.run(watchRankingsRead);
