import { useSelector } from 'react-redux';
import { selectUserById, selectAllUsers } from '../redux/users/selectors';
import { selectPostsByUser } from '../redux/posts/selectors';
import { useState, memo } from 'react';
import { UserSelect } from './user-select';
import { TimeAgo } from './time-ago';

const PostExcerpt = memo((props) => {
  const { post, user } = props;
  const userName = user
    ? `${user.firstName} ${user.lastName}`
    : 'Unknown author';

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{`by ${userName}`}</p>
      {!!post.date && (
        <p>
          <TimeAgo timestamp={post.date} />
        </p>
      )}
      <p>{post.content.substring(0, 100)}</p>
    </article>
  );
});

/** adding user pages */
export const UserPage = () => {
  const [userId, setUserId] = useState('');
  const users = useSelector(selectAllUsers);

  const user = useSelector((state) => selectUserById(state, userId));

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId));

  return (
    <section>
      <h2>{'User Page'}</h2>
      <UserSelect users={users} userId={userId} setUserId={setUserId} />
      {postsForUser?.map((post) => (
        <PostExcerpt post={post} user={user} key={post.id} />
      ))}
    </section>
  );
};
