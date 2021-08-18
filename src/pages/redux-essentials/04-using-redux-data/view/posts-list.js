import { useSelector } from 'react-redux';

import { selectPosts } from '../redux/posts/selectors';
import { ReactionButtons } from './reaction-buttons';
import { TimeAgo } from './time-ago';

/** showing the posts list */
export const PostsList = () => {
  const posts = useSelector(selectPosts);
  /** sorting the posts list */
  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.date?.localeCompare(a.date));

  return (
    <section>
      <h2>{'Posts'}</h2>
      {sortedPosts.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
          {!!post.date && (
            <p>
              <TimeAgo timestamp={post.date} />
            </p>
          )}
          <ReactionButtons post={post} />
        </article>
      ))}
    </section>
  );
};
