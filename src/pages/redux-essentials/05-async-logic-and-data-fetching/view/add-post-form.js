import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost, postAdded } from '../redux/posts/slice';
import { selectUsersIds } from '../redux/users/selectors';

export const AddPostForm = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  /** checking thunk results in components */
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const usersIds = useSelector(selectUsersIds);
  const dispatch = useDispatch();

  const isAddable =
    !!title && !!content && !!userId && addRequestStatus === 'idle';

  const handleTitleChanged = (event) => setTitle(event.target.value);
  const handleContentChanged = (event) => setContent(event.target.value);
  const handleAuthorChanged = (event) => setUserId(event.target.value);

  const handleSavePostClicked = async () => {
    if (isAddable) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        );
        unwrapResult(resultAction);
        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Failed to save the post: ', error);
      } finally {
        setAddRequestStatus('idle');
      }
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
            disabled={!isAddable}
          >
            {'Save Post'}
          </button>
        </div>
      </form>
    </section>
  );
};
