import { useState, useEffect } from 'react';

const Example = () => {
  /** state hook */
  const [count, setCount] = useState(0);
  /** effect hook */
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

/** state hook */
const ExampleWithManyStates = () => {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  return <></>;
};

/** effect hook */
class ChatAPI {
  static subscribeToFriendStatus(id, callback) {
    const promise = new Promise((resolve) => {

      // how about set interval here



      setTimeout(() => {
        const status = {
          isOnline: id === 1,
        };
        resolve(status);
      }, 1000);
    });
    promise.then((status) => {
      console.log('subscribed');
      callback(status)
    });
  }
  static unsubscribeFromFriendStatus(id, callback) {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        const status = {
          isOnline: id === 1,
        };
        resolve(status);
      }, 1000);
    });
    promise.then((status) => {
      console.log('unsubscribed');
      callback(status)
    });
  }
}

const FriendStatus = (props) => {
  const [isOnline, setIsOnline] = useState(null);
  const handleStatusChange = (status) => {
    setIsOnline(status.isOnline);
  };
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
};

const HooksAtAGlance = () => {
  return (
    <>
      <Example />
      <ExampleWithManyStates />
      <FriendStatus friend={{ id: 1 }} />
    </>
  );
};

export default HooksAtAGlance;
