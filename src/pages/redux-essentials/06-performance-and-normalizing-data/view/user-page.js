import { useSelector } from 'react-redux';
import { selectUserById, selectAllUsers } from '../redux/users/selectors';
import { selectAllPosts, selectPostsByUser } from '../redux/posts/selectors';
import { useState } from 'react';
import { UserSelect } from './user-select';

/** adding user pages */
export const UserPage = () => {
  const [userId, setUserId] = useState('');
  const users = useSelector(selectAllUsers);

  const user = useSelector((state) => selectUserById(state, userId))

  const postsForUser = useSelector(state => selectPostsByUser(state, userId))

/*
  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => post.user === userId);
  });
*/


  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>{post.title}</li>
  ));

  return (
    <section>
      <h2>{'User Page'}</h2>
      <UserSelect users={users} userId={userId} setUserId={setUserId} />

      <ul>{postTitles}</ul>
    </section>
  );
};
