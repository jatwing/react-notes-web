import { configureStore } from '@reduxjs/toolkit';

import { postsReducer } from './posts/slice';
import { usersReducer } from './users/slice';
import { notificationsReducer } from './notifications/slice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer
  },
});
