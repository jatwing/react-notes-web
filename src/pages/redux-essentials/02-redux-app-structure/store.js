import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counter-slice';

/** creating the redux store */
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export { store };
