import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

import { client } from '../../api/client';

/** updating the post slice */
const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

/**
 * getInitialState() will generate the ids and entities
 */
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.posts;
});

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
        /** updating the posts slice */
        const post = state.entities[id];
        if (post) {
          post.title = title;
          post.content = content;
        }
      },
    },
    reactionAdded: (state, action) => {
      const { id, reaction } = action.payload;
      const post = state.entities[id];
      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      /** updating the posts slice */
      postsAdapter.upsertMany(state, action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    /** updating the posts slice */
    [addNewPost.fulfilled]: postsAdapter.addOne,
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;

/** updating the posts slice */
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);
