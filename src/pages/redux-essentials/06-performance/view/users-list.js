import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectAllUsers } from '../redux/users/selectors';

/** adding user pages */
export const UsersList = () => {
  const users = useSelector(selectAllUsers);

  return (
    <section>
      <h2>{'Users'}</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </section>
  );
};
