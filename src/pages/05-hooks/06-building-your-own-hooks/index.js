import { useEffect, useState } from 'react';
import { ChatApi } from '../04-using-the-effect-hook/chat';

/** extracting a custom hook */
const useFriendStatus = (friendId) => {
  const [isOnline, setIsOnline] = useState(null);
  const handleStatusChange = (status) => {
    setIsOnline(status?.isOnline);
  };
  useEffect(() => {
    ChatApi.subscribeToFriendStatus(friendId, handleStatusChange);
    return () => {
      ChatApi.unsubscribeFromFriendStatus(friendId, handleStatusChange);
    };
  }, [friendId]);
  return isOnline;
};

/** using a custom hook */
const FriendStatus = (props) => {
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

const FriendList = (props) => {
  return props.friends.map((friend) => (
    <FriendListItem friend={friend} key={friend.id} />
  ));
};

/** pass information between hooks */
const Circle = (props) => {
  const style = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    background: props.color,
    borderRadius: '50%',
  };
  return <div style={style} />;
};

const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

const ChatRecipientPicker = () => {
  const [recipientId, setRecipientId] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientId);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientId}
        onChange={(e) => setRecipientId(Number(e.target.value))}
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

/** use your imagination */
const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);
  const dispatch = (action) => {
    const nextState = reducer(state, action);
    setState(nextState);
  };
  return [state, dispatch];
};

const todosReducer = (state, action) => {
  if (action.type === 'add') {
    return state.concat([action.payload.text]);
  }
  return state;
};

const Todos = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [text, setText] = useState('');
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleClick = () => {
    if (!text) {
      return;
    }
    dispatch({ type: 'add', payload: { text: text } });
    setText('');
  };
  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
      <p>To Do List</p>
      <ol>
        {todos.map((todo, index) => (
          <li>{todo}</li>
        ))}
      </ol>
    </div>
  );
};

const BuildingYourOwnHooks = () => {
  return (
    <>
      <FriendStatus friend={{ id: 1 }} />
      <FriendList
        friends={[
          { id: 2, name: 2 },
          { id: 3, name: 3 },
        ]}
      />
      <ChatRecipientPicker />
      <Todos />
    </>
  );
};

export default BuildingYourOwnHooks;
