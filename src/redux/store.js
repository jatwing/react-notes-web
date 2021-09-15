import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { watchAuthorsRead } from './authors/sagas';
import { authorsReducer } from './authors/slice';
import { watchNotificationsRead } from './notifications/sagas';
import { notificationsReducer } from './notifications/slice';
import { watchProjectsRead } from './projects/sagas';
import { projectsReducer } from './projects/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    projects: projectsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthorsRead);
sagaMiddleware.run(watchProjectsRead);
sagaMiddleware.run(watchNotificationsRead);
