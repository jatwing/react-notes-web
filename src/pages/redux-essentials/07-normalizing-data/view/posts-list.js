import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPostsError, selectPostsStatus } from '../redux/posts/selectors';
import {
  fetchPosts,
  selectAllPosts,
  selectPostById,
  selectPostIds,
} from '../redux/posts/slice';
import { selectUserById } from '../redux/users/slice';
import { ReactionButtons } from './reaction-buttons';
import { TimeAgo } from './time-ago';

/** optimizing the posts list */
const PostExcerpt = (props) => {
  const { postId } = props;
  const post = useSelector((state) => selectPostById(state, postId));
  /**
   * TODO what is the standard form of selector
   */
  const user = useSelector((state) => selectUserById(state, post.user));
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
  const dispatch = useDispatch();
  const sortedPostsIds = useSelector(selectPostIds);

  console.log(sortedPostsIds);

  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  /*
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);
  */

  let content;
  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = sortedPostsIds?.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
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
