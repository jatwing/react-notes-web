import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

import { client } from '../../api/client';

/** loading state for requests */
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

/** fetching data with createAsyncThunk */
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.posts;
});

/** sending data with thunks */
export const addNewPost = createAsyncThunk(
  'posts/addNewPosts',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', { post: initialPost });
    return response.post;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.data.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            author: userId,
          },
        };
      },
    },
    postUpdated: {
      reducer: (state, action) => {
        const { id, title, content } = action.payload;
        const post = state.data.find((post) => post.id === id);
        if (post) {
          post.title = title;
          post.content = content;
        }
      },
    },
    reactionAdded: (state, action) => {
      const { id, reaction } = action.payload;
      const post = state.data.find((post) => post.id === id);
      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
  /** reducers and loading actions */
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = state.data.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
