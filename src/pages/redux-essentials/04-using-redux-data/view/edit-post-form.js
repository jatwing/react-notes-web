import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPostById, selectPosts } from '../redux/posts/selectors';
import { postUpdated } from '../redux/posts/slice';

/** editing posts */
export const EditPostForm = () => {
  const posts = useSelector(selectPosts);
  const [postId, setPostId] = useState('');
  const post = useSelector(selectPostById(postId));
 // const post = posts.find(post => post.id === postId)

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const dispatch = useDispatch();

  const handlePostChanged = (event) => {
    setPostId(event.target.value);

    console.log('####idchagne')
  };
  const handleTitleChanged = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChanged = (event) => {
    setContent(event.target.value);
  };
  const handleSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
    }
  };

  console.log('##here')
  console.log(post)

  return (
    <section>
      <h2>{'Editing Posts'}</h2>

      <label htmlFor="posts">{'Choose a post:'}</label>
      <select
        id="posts"
        name="posts"
        value={postId}
        onChange={handlePostChanged}
      >
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
        <>
          <form>
            <label htmlFor="postTitle">{'Post Title:'}</label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              value={title}
              onChange={handleTitleChanged}
            />
            <label htmlFor="postContent">{'Content:'}</label>
            <textarea
              id="postContent"
              name="postContent"
              value={content}
              onChange={handleContentChanged}
            />
          </form>
          <button type="button" onClick={handleSavePostClicked}>
            {'Save Post'}
          </button>
        </>
      ) : (
        <h3>{'Post not found!'}</h3>
      )}
    </section>
  );
};
