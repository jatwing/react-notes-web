import { useSelector } from 'react-redux';

import { selectPosts } from '../redux/posts/selectors';

/** showing the posts list */
export const PostsList = () => {
  const posts = useSelector(selectPosts);
  return (
    <section>
      <h2>{'Posts'}</h2>
      {posts.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
        </article>
      ))}
    </section>
  );
};
