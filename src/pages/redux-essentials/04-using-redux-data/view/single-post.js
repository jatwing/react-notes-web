import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectPostById, selectPosts } from '../redux/posts/selectors';

/** showing single posts */
export const SinglePost = () => {
  const posts = useSelector(selectPosts);
  const [postId, setPostId] = useState('');
  const post = useSelector(selectPostById(postId));

  const handleChange = (event) => {
    setPostId(event.target.value);
  };

  return (
    <section>
      <h2>{'Showing Single Posts'}</h2>
      <label htmlFor="posts">{'Choose a post:'}</label>
      <select id="posts" name="posts" value={postId} onChange={handleChange}>
        <option value={''} key={''}>
          {''}
        </option>
        {posts.map((post) => (
          <option value={post.id} key={post.id}>
            {post.title}
          </option>
        ))}
      </select>

      {post ? (
        <article>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </article>
      ) : (
        <h3>{'Post not found!'}</h3>
      )}
    </section>
  );
};
