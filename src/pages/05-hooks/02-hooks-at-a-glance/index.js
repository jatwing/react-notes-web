import { useState, useEffect } from 'react';


/** effect hook */
class ChatApi {
  intervals = {};
  status = {};
  subscribeToFriendStatus(id, callback) {
    const intervalId = setInterval(() => {
      this.status = {
        isOnline: Math.random() < 0.5,
      };
      callback(this.status);
    }, 1000);
    this.intervals[id] = intervalId;
    console.log('subscribed');
  }
  unsubscribeFromFriendStatus(id, callback) {
    const intervalId = this.intervals[id];
    if (!intervalId) {
      console.log('unsubscribed');
      return;
    }
    clearInterval(intervalId);
    callback(this.status);
    console.log('unsubscribed');
  }
}
const chatApi = new ChatApi();

const FriendStatus = (props) => {
  const [isOnline, setIsOnline] = useState(null);
  const handleStatusChange = (status) => {
    setIsOnline(status.isOnline);
  };
  useEffect(() => {
    chatApi.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      chatApi.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, []);
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
};

/** effect hook */
const FriendStatusWithCounter = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  const [isOnline, setIsOnline] = useState(null);
  const handleStatusChange = (status) => {
    setIsOnline(status.isOnline);
  };
  useEffect(() => {
    chatApi.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      chatApi.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, []);
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
};

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
      <FriendStatus friend={{ id: 1 }} />
      <FriendStatusWithCounter friend={{ id: 2 }} />
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
