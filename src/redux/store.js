import {
  configureStore
} from '@reduxjs/toolkit'
import {  authorsReducer } from './authors/slice'

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
  }

})
