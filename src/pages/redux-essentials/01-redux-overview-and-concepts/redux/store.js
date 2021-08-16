import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { counterReducer } from './counter/reducer';

/** store */
const initialState = {
  counter: {
    value: 0,
    status: '',
  },
};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(
  counterReducer,
  initialState,
  composedEnhancer
);
