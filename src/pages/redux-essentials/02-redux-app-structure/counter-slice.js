import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counter-api';

/** writing async logic with thunks */
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

/** creating slice reducers and actions */
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    status: 'idle',
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
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const counterReducer = counterSlice.reducer;
/**
 * { type: 'counter/increment' }
 * { type: 'counter/decrement' }
 * { type: 'counter/incrementByAmount' }
 */
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

/** reading data with useSelector */
export const selectCount = (state) => state.counter.value;
