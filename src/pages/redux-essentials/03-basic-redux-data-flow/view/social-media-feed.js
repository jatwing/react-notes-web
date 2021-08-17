import { AddPostForm } from './add-post-form';
import { PostsList } from './posts-list';
import { Title } from './title';

export const SocialMediaFeed = () => {
  return (
    <>
      <Title />
      <hr />
      <PostsList />
      <hr />
      <AddPostForm />
    </>
  );
};
