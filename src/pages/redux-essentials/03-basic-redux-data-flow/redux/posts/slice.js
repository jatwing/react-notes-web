import { createSlice } from '@reduxjs/toolkit';

/** creating the posts slice */
const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  /** saving post entries */
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
    },
  },
});

export const { postAdded } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
