import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { client } from '../../api/client';

const initialState = [];

/** loading users */
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('fakeApi/users');
  return response.users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const usersReducer = usersSlice.reducer;
