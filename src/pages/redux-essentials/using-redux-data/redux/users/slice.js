import { createSlice } from '@reduxjs/toolkit';

/** adding a users slice */
const initialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const usersReducer = usersSlice.reducer;
