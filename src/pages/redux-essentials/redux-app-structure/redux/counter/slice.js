import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchCount } from '../../api/counter';

/** writing async logic with thunks */
export const valueIncreasedAsync = createAsyncThunk(
  'counter/valueIncreasedAsync',
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
    valueIncreased: (state) => {
      state.value += 1;
    },
    valueDecreased: (state) => {
      state.value -= 1;
    },
    valueIncreasedByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  /** writing async logic with thunks */
  extraReducers: (builder) => {
    builder
      .addCase(valueIncreasedAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(valueIncreasedAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value += action.payload;
      })
      .addCase(valueIncreasedAsync.rejected, (state, action) => {
        state.status = 'rejected';
        console.log(action);
      });
  },
});

export const counterReducer = counterSlice.reducer;

export const { valueIncreased, valueDecreased, valueIncreasedByAmount } =
  counterSlice.actions;
