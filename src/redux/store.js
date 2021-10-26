import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchAuthorRead } from 'src/redux/author/sagas';
import { authorReducer } from 'src/redux/author/slice';
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
} from 'src/redux/i18n/sagas';
import { watchNotificationsRead } from 'src/redux/notifications/sagas';
import {
  notificationsReducer,
  notificationsTranslated,
} from 'src/redux/notifications/slice';
import { pagesReducer, pagesTranslated } from 'src/redux/pages/slice';
import { watchProjectRead } from 'src/redux/project/sagas';
import { projectReducer, projectLocalized } from 'src/redux/project/slice';
import { watchRankingsRead } from 'src/redux/rankings/sagas';
import { rankingsReducer, rankingsRead } from 'src/redux/rankings/slice';
import { watchPagesTranslated } from 'src/redux/pages/sagas';
import { pageTranslated } from 'src/redux/pages/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    author: authorReducer,
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
          pagesTranslated.toString(),
          projectLocalized.toString(),
          rankingsRead.settled.toString(),
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthorRead);
sagaMiddleware.run(watchTranslationAccessible);
sagaMiddleware.run(watchLocalizationAccessible);
sagaMiddleware.run(watchNotificationsRead);
sagaMiddleware.run(watchPagesTranslated);
sagaMiddleware.run(watchProjectRead);
sagaMiddleware.run(watchRankingsRead);
