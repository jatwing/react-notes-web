import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchAuthorsRead } from 'src/redux/authors/sagas';
import { authorsReducer } from 'src/redux/authors/slice';
import { watchNotificationsRead } from 'src/redux/notifications/sagas';
import { notificationsReducer } from 'src/redux/notifications/slice';
import { watchProjectsRead } from 'src/redux/projects/sagas';
import { projectsReducer } from 'src/redux/projects/slice';
import { watchRankingsRead } from 'src/redux/rankings/sagas';
import { rankingsReducer } from 'src/redux/rankings/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    projects: projectsReducer,
    notifications: notificationsReducer,
    rankings: rankingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthorsRead);
sagaMiddleware.run(watchProjectsRead);
sagaMiddleware.run(watchNotificationsRead);
sagaMiddleware.run(watchRankingsRead);
