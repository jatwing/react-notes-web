export const selectUsers = (state) => state.users;

export const selectUserById = (userId) => (state) =>
  state.users.find((user) => user.id === userId);

export const selectUsersIds = (state) => state.users.map((user) => user.id);
