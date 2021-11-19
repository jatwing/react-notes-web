import './api/server';

import React from 'react';
import { Provider } from 'react-redux';

import { fetchPosts } from './redux/posts/slice';
import store from './redux/store';
import { fetchUsers } from './redux/users/slice';
import { NotificationsList } from './view/notifications-list';
import { PostsList } from './view/posts-list';
import { Title } from './view/title';
import { UserPage } from './view/user-page';
import { UsersList } from './view/users-list';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

const NormalizingData = () => {
  return (
    <Provider store={store}>
      <Title />

      <PostsList />

      <UsersList />

      {/*
      <UserPage />
      <NotificationsList />
*/}
    </Provider>
  );
};

export default NormalizingData;
