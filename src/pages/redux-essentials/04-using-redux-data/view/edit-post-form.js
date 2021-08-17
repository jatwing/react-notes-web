import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPostById, selectPosts } from '../redux/posts/selectors';
import { postUpdated } from '../redux/posts/slice';

/** editing posts */
export const EditPostForm = () => {
  const posts = useSelector(selectPosts);
  const [editedPost, setEditedPost] = useState(null);

  //const [postId, setPostId] = useState('');

  //  const post = useSelector(selectPostById(postId));
  // const post = posts.find(post => post.id === postId)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {


    setTitle(editedPost?.title || "");

    setContent(editedPost?.content || "");
  }, [editedPost]);

  const handlePostChanged = (event) => {
    const postId = event.target.value;

    const test = posts.find((post) => post.id === postId);

    setEditedPost(test);

  };
  const handleTitleChanged = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChanged = (event) => {
    setContent(event.target.value);
  };
  const handleSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: editedPost.id, title, content }));
    }
  };

  return (
    <section>
      <h2>{'Editing Posts'}</h2>

      <label htmlFor="posts">{'Choose a post:'}</label>
      <select
        id="posts"
        name="posts"
        value={editedPost?.id}
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
      {!!editedPost ? (
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
