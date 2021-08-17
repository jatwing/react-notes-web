import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { postAdded } from '../redux/posts/slice';

/** adding new posts */
export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  /** dispatching the post added action */
  const handleSavePostClick = () => {
    if (title && content) {
      const post = {
        id: nanoid(),
        title,
        content,
      };
      dispatch(postAdded(post));
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
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="postContent">{'Content:'}</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleSavePostClick}>
            {'Save Post'}
          </button>
        </div>
      </form>
    </section>
  );
};
