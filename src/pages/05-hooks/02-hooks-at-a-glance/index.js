import { useState, useEffect } from 'react';





/** building your own hooks */
const useFriendStatus = (friendId) => {
  const [isOnline, setIsOnline] = useState(null);
  const handleStatusChange = (status) => {
    setIsOnline(status.isOnline);
  };
  useEffect(() => {
    chatApi.subscribeToFriendStatus(friendId, handleStatusChange);
    return () => {
      chatApi.unsubscribeFromFriendStatus(friendId, handleStatusChange);
    };
  }, []);
  return isOnline;
};
const FriendStatusByHook = (props) => {
  const isOnline = useFriendStatus(props.friend.id);
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
};

const FriendListItem = (props) => {
  const isOnline = useFriendStatus(props.friend.id);
  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>
  );
};

const FriendsList = (props) => {
  return props.friends.map((friend) => <FriendListItem friend={friend} key={friend.id} />);
};

const HooksAtAGlance = () => {
  return (
    <>
      <FriendStatusByHook friend={{ id: 3 }} />
      <FriendsList
        friends={[
          { id: 4, name: 4 },
          { id: 5, name: 5 },
        ]}
      />
    </>
  );
};

export default HooksAtAGlance;
