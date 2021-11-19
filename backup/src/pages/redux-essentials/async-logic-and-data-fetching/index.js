import './api/server';

import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import { fetchUsers } from './redux/users/slice';
import { AddPostForm } from './view/add-post-form';
import { PostsList } from './view/posts-list';
import { Title } from './view/title';

store.dispatch(fetchUsers());

const BasicReduxDataFlow = () => {
  return (
    <Provider store={store}>
      <Title />
      <AddPostForm />
      <PostsList />
    </Provider>
  );
};

export default BasicReduxDataFlow;
