import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchCount } from './api';

/** writing async logic with thunks */
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

/** creating slice reducers and actions */
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    status: '',
  },
  /** reducers and immutable updates */
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  /** writing async logic with thunks */
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = 'rejected';
        console.log(action);
      });
  },
});

export const counterReducer = counterSlice.reducer;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
