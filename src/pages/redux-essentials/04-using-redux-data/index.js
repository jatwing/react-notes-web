import { Provider } from 'react-redux';

import store from './redux/store';
import { AddPostForm } from './view/add-post-form';
import { EditPostForm } from './view/edit-post-form';
import { PostsList } from './view/posts-list';
import { SinglePost } from './view/single-post';
import { Title } from './view/title';

const BasicReduxDataFlow = () => {
  return (
    <Provider store={store}>
      <Title />
      <SinglePost />
      <EditPostForm />
      <AddPostForm />
      <PostsList />
    </Provider>
  );
};

export default BasicReduxDataFlow;
