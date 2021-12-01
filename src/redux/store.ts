import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { watchAuthorRead } from 'redux/author/sagas';
import { authorReducer } from 'redux/author/slice';
import { watchI18nAccessible } from 'redux/i18n/sagas';
import {
  i18nAccessible,
  i18nReducer,
  instanceInitialized,
  languageChanged,
  resourcesAdded,
} from 'redux/i18n/slice';
import { watchNotificationsRead } from 'redux/notifications/sagas';
import {
  notificationsInternationalized,
  notificationsReducer,
} from 'redux/notifications/slice';
import { watchPagesInternationalized } from 'redux/pages/sagas';
import { pagesInternationalized, pagesReducer } from 'redux/pages/slice';
import { watchProjectRead } from 'redux/project/sagas';
import { projectInternationalized, projectReducer } from 'redux/project/slice';
import { watchPagesRankingsRead } from 'redux/rankings/sagas';
import { pagesRankingsRead, rankingsReducer } from 'redux/rankings/slice';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

export const store: EnhancedStore<any> = configureStore({
  reducer: {
    i18n: i18nReducer,
    author: authorReducer,
    notifications: notificationsReducer,
    pages: pagesReducer,
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
          i18nAccessible.toString(),
          notificationsInternationalized.toString(),
          pagesInternationalized.toString(),
          projectInternationalized.toString(),
          pagesRankingsRead.settled.toString(),
        ],
        ignoredPaths: ['i18n.entity'],
      },
    }).concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(watchI18nAccessible);
sagaMiddleware.run(watchAuthorRead);
sagaMiddleware.run(watchNotificationsRead);
sagaMiddleware.run(watchPagesInternationalized);
sagaMiddleware.run(watchProjectRead);
sagaMiddleware.run(watchPagesRankingsRead);
