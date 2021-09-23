import { configureStore } from '@reduxjs/toolkit';

import { postsReducer } from './posts/slice';

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
