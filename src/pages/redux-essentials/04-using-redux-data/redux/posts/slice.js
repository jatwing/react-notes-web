import { createSlice } from '@reduxjs/toolkit';

import { selectPostById } from './selectors';

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
    postAdded: (state, action) => {
      state.push(action.payload);
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const post = selectPostById(id)(state);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
