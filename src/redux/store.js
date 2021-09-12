import {
  configureStore
} from '@reduxjs/toolkit'
import {  authorsReducer } from './authors/slice'
import { projectsReducer  } from './projects/slice';
import  createSagaMiddleware  from 'redux-saga'

import { watchAuthorsFetched } from './authors/sagas'
import {watchProjectsFetched} from './projects/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})


sagaMiddleware.run(watchAuthorsFetched);
sagaMiddleware.run(watchProjectsFetched);
