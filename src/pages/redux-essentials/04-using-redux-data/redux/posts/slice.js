import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    title: 'First Post!',
    content: 'Hello!',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    title: 'Second Post',
    content: 'More text',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            /** storing dates for posts */
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
        const post = state.find((post) => post.id === id);
        if (post) {
          post.title = title;
          post.content = content;
        }
      },
    },
    reactionAdded: (state, action) => {
      const { id, reaction } = action.payload;
      const post = state.find((post) => post.id === id);
      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
