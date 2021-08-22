export const UserSelect = (props) => {
  const { users, userId, setUserId } = props;
  const handleSelectChanged = (event) => {
    setUserId(event.target.value)
  }

  return (
    <select value={userId} onChange={handleSelectChanged} >
      <option value="" />
      {users.map((user) => (
        <option value={user.id} key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};
