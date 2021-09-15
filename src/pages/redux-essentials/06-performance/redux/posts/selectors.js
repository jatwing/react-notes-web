import { createSelector } from '@reduxjs/toolkit';

/** extracting posts selectos */
export const selectAllPosts = (state) => state.posts.data;

export const selectPostById = (postId) => (state) =>
  state.posts.data.find((post) => post.id === postId);

export const selectPostsIds = (state) =>
  state.posts.data.map((post) => post.id);

export const selectPostsStatus = (state) => state.posts.status;

export const selectPostsError = (state) => state.posts.error;

/** memoizing selector functions */
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);
