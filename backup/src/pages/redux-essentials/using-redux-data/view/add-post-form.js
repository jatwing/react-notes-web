import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postAdded } from '../redux/posts/slice';
import { selectUsersIds } from '../redux/users/selectors';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  /** adding authors for posts */
  const [userId, setUserId] = useState('');
  const usersIds = useSelector(selectUsersIds);
  const dispatch = useDispatch();

  const isSavable = !!title && !!content && !!userId;
  const handleTitleChanged = (event) => setTitle(event.target.value);
  const handleContentChanged = (event) => setContent(event.target.value);
  const handleAuthorChanged = (event) => setUserId(event.target.value);
  const handleSavePostClicked = () => {
    if (isSavable) {
      /** preparing action payloads */
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  return (
    <section>
      <h2>{'Add a New Post'}</h2>
      <form>
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
          <label htmlFor="postAuthor">{'Author:'}</label>
          <select value={userId} onChange={handleAuthorChanged}>
            <option value=""></option>
            {usersIds.map((id) => (
              <option value={id} key={id}>
                {id}
              </option>
            ))}
          </select>
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
            disabled={!isSavable}
          >
            {'Save Post'}
          </button>
        </div>
      </form>
    </section>
  );
};
