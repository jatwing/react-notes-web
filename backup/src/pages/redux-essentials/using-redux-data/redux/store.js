import { configureStore } from '@reduxjs/toolkit';

import { postsReducer } from './posts/slice';
import { usersReducer } from './users/slice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});
