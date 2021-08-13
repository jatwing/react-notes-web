import { createSlice } from '@reduxjs/toolkit';

/** creating slice reducers and actions */
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  /** reducers and immutable updates */
  reducers: {
    increment: (state) => {
      /**
       * return {
       *   ...state,
       *   value: state.value + 1
       * }
       */
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

const counterReducer = counterSlice.reducer;
/**
 * { type: 'counter/increment' }
 * { type: 'counter/decrement' }
 * { type: 'counter/incrementByAmount' }
 */
const { increment, decrement, incrementByAmount } = counterSlice.actions;

export {
  counterSlice,
  counterReducer,
  increment,
  decrement,
  incrementByAmount,
};
