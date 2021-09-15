import { configureStore } from '@reduxjs/toolkit';

import { notificationsReducer } from './notifications/slice';
import { postsReducer } from './posts/slice';
import { usersReducer } from './users/slice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});
