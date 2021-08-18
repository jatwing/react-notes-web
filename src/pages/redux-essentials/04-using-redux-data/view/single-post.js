import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectPostById, selectPostsIds } from '../redux/posts/selectors';
import { selectUserById } from '../redux/users/selectors';

/** showing single posts */
export const SinglePost = () => {
  const [postId, setPostId] = useState('');
  const postsIds = useSelector(selectPostsIds);
  const post = useSelector(selectPostById(postId));
  const author = useSelector(selectUserById(post?.author));

  const handlePostIdChanged = (event) => {
    setPostId(event.target.value);
  };

  return (
    <section>
      <h2>{'Showing Single Posts'}</h2>
      <form>
        <label htmlFor="posts">{'Post:'}</label>
        <select
          id="posts"
          name="posts"
          value={postId}
          onChange={handlePostIdChanged}
        >
          <option value={''} />
          {postsIds.map((id) => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
        {!!post ? (
          <article>
            <h3>{post.title}</h3>
            <p>{`by ${author?.name ?? 'Unknown author'}`}</p>
            <p>{post.content}</p>
          </article>
        ) : (
          <h3>{'Post not found!'}</h3>
        )}
      </form>
    </section>
  );
};
