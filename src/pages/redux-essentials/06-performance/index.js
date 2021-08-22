import './api/server';

import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import { fetchPosts } from './redux/posts/slice' 
import { fetchUsers } from './redux/users/slice';
import { Title } from './view/title';
import { UsersList } from './view/users-list';
import { UserPage } from './view/user-page'
import { NotificationsList } from './view/notifications-list'

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());


const Performance = () => {
  return (
    <Provider store={store}>
      <Title />
      <UsersList />
      <UserPage />
      <NotificationsList />
    </Provider>
  );
};

export default Performance;
