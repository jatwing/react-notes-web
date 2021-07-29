import { useState, useEffect } from 'react';

const ChatAPI = {
  subscribeToFriendStatus: (id, handleStatusChange) => {
    return null;
  },
  unsubscribeFromFriendStatus: (id, handleStatusChange) => {
    return null;
  },
};

const useFriendStatus = (friendID) => {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    const handleStatusChange = (status) => {
      setIsOnline(status.isOnline);
    };
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  return isOnline;
};

const FriendStatus = (props) => {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
};

/**
 * pass information between hooks
 */
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

const ChatRecipientPicker = () => {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={(e) => setRecipientID(Number(e.target.value))}
      >
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
};

/*
 * a simplified version of reducer
 */
const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);
  const dispatch = (action) => {
    const nextState = reducer(state, action);
    setState(nextState);
  };

  return [state, dispatch];
};

const todosReducer = null;

const Todos = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const handleAddClick = (text) => {
    dispatch({ type: 'add', text });
  };
};
