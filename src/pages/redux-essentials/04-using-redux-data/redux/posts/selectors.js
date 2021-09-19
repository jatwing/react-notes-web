export const selectPosts = (state) => state.posts;

export const selectPostById = (postId) => (state) =>
  state.posts.find((post) => post.id === postId);

export const selectPostsIds = (state) => state.posts.map((post) => post.id);