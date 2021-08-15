import { createStore } from 'redux';
import { counterReducer } from './counter-slice';

/** store */
const initialState = {
  counter: {
    value: 0,
  },
};
export const store = createStore(counterReducer, initialState);

/** selectors */
export const selectCounterValue = (state) => state.counter.value;
