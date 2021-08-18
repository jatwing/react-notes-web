import { is } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPostById, selectPostsIds } from '../redux/posts/selectors';
import { postUpdated } from '../redux/posts/slice';
import { selectUserById } from '../redux/users/selectors';

/** editing posts */
export const EditPostForm = () => {
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const postsIds = useSelector(selectPostsIds);
  const post = useSelector(selectPostById(postId));
  const author = useSelector(selectUserById(post?.author));
  const dispatch = useDispatch();
  useEffect(() => {
    setTitle(post?.title || '');
    setContent(post?.content || '');
  }, [post]);

  const isEditable = !!title && !!content;
  const handlePostIdChanged = (event) => {
    setPostId(event.target.value);
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

  return (
    <section>
      <h2>{'Editing Posts'}</h2>
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
          <>
            <div>
              <label htmlFor="postTitle">{'Post Title:'}</label>
              <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={handleTitleChanged}
              />
            </div>
            <div>
              <label>{'Author:'}</label>
              <label>{author?.name ?? 'Unknown author'}</label>
            </div>
            <div>
              <label htmlFor="postContent">{'Content:'}</label>
              <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={handleContentChanged}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleSavePostClicked}
                disabled={!isEditable}
              >
                {'Save Post'}
              </button>
            </div>
          </>
        ) : (
          <h3>{'Post not found!'}</h3>
        )}
      </form>
    </section>
  );
};
