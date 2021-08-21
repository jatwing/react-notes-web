export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);

export const selectUsersIds = (state) => state.users.map((user) => user.id);
