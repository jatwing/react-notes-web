import { createStore } from 'redux';
import { counterReducer } from './counter-reducer';

const initialState = {
  counter: {
    value: 0,
  },
};

export const store = createStore(counterReducer, initialState);

export const selectCount = (state) => state.counter.value;
