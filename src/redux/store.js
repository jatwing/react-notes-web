import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchAuthorsRead } from 'src/redux/authors/sagas';
import { authorsReducer } from 'src/redux/authors/slice';
import {
  resourcesAdded,
  languageChanged,
} from 'src/redux/i18n/slice';
import { watchNotificationsRead } from 'src/redux/notifications/sagas';
import { notificationsReducer } from 'src/redux/notifications/slice';
import { pagesReducer, pagesLocalized } from 'src/redux/pages/slice';
import { watchPagesLocalized } from 'src/redux/pages/sagas';
import { watchProjectsRead } from 'src/redux/projects/sagas';
import { projectsLocalized  ,projectsReducer } from 'src/redux/projects/slice';
import { watchRankingsRead } from 'src/redux/rankings/sagas';
import { rankingsReducer, rankingsRead } from 'src/redux/rankings/slice';
import { notificationsLocalized  } from 'src/redux/notifications/slice';

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
          resourcesAdded.toString(),
          languageChanged.toString(),
          notificationsLocalized.toString(),
          pagesLocalized.toString(),
          projectsLocalized.toString(),
          rankingsRead.settled.toString(),
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthorsRead);
sagaMiddleware.run(watchNotificationsRead);
sagaMiddleware.run(watchPagesLocalized);
sagaMiddleware.run(watchProjectsRead);
sagaMiddleware.run(watchRankingsRead);
