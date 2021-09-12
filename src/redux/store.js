import {
  configureStore
} from '@reduxjs/toolkit'
import {  authorsReducer } from './authors/slice'
import  createSagaMiddleware  from 'redux-saga'

import { watchAuthorsFetched } from './authors/sagas'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})


sagaMiddleware.run(watchAuthorsFetched);
