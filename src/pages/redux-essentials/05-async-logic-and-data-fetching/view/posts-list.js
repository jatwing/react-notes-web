import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from '../redux/posts/selectors';
import { fetchPosts } from '../redux/posts/slice';
import { selectUserById } from '../redux/users/selectors';
import { ReactionButtons } from './reaction-buttons';
import { TimeAgo } from './time-ago';

const PostExcerpt = (props) => {
  const { post } = props;
  const user = useSelector(selectUserById(post.user));
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
      <ReactionButtons post={post} />
    </article>
  );
};

export const PostsList = () => {
  /** fetching data with createAsyncThunk */
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (status === 'idle') {
      console.log('aysnc thunk result');
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  /** displaying loading state */
  let content;
  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.date?.localeCompare(a.date));

    content = sortedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>{'Posts'}</h2>
      {content}
    </section>
  );
};
