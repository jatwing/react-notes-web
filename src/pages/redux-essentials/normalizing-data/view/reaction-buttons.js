import { useDispatch } from 'react-redux';

import { reactionAdded } from '../redux/posts/slice';

/** post reaction buttons */

const reactionEmojis = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const handleReactionClicked = (name) => () => {
    dispatch(
      reactionAdded({
        id: post.id,
        reaction: name,
      })
    );
  };

  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => {
      return (
        <button key={name} type="button" onClick={handleReactionClicked(name)}>
          {emoji} {post.reactions[name]}
        </button>
      );
    }
  );

  return <div>{reactionButtons}</div>;
};
