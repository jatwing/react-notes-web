import { EditPostForm } from './edit-post-form';
import { SinglePost } from './single-post';
import { Title } from './title';

export const SocialMediaFeed = () => {
  return (
    <>
      <Title />
      <hr />
      <SinglePost />
      <hr />
      <EditPostForm />
    </>
  );
};
