import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import { AddPostForm } from './view/add-post-form';
import { PostsList } from './view/posts-list';
import { Title } from './view/title';

const BasicReduxDataFlow = () => {
  return (
    <Provider store={store}>
      <AddPostForm />
      <PostsList />
      <Title />
    </Provider>
  );
};

export default BasicReduxDataFlow;
