import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchAuthorsRead } from 'src/redux/authors/sagas';
import { authorsReducer } from 'src/redux/authors/slice';
import { watchNotificationsRead } from 'src/redux/notifications/sagas';
import { notificationsReducer } from 'src/redux/notifications/slice';
import { watchProjectsRead } from 'src/redux/projects/sagas';
import { projectsReducer } from 'src/redux/projects/slice';
import { watchRanksRead } from 'src/redux/ranks/sagas';
import { ranksReducer } from 'src/redux/ranks/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    projects: projectsReducer,
    notifications: notificationsReducer,
    ranks: ranksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthorsRead);
sagaMiddleware.run(watchProjectsRead);
sagaMiddleware.run(watchNotificationsRead);
sagaMiddleware.run(watchRanksRead);
