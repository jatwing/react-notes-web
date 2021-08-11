import { useState, useEffect, Component } from 'react';

/** effects without cleanup */
class EffectsWithoutCleanupClassExample extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

const EffectsWithoutCleanupHookExample = () => {
  const [count, setCount] = useState(0);
  /** useEffect runs after every render */
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    /** optimizing performance by skipping effects */
  }, [count]);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

/** effects with cleanup */
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

class EffectsWithCleanupClassExample extends Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  componentDidMount() {
    chatApi.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  /** why effects run on each update */
  componentDidUpdate(prevProps) {
    if (this.props.friend.id === prevProps.friend.id) {
      return
    }
    chatApi.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    chatApi.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
 }
  componentWillUnmount() {
    chatApi.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline,
    });
  }
  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}

const EffectsWithCleanupHookExample = (props) => {
  const [isOnline, setIsOnline] = useState(null);
  const handleStatusChange = (status) => {
    setIsOnline(status.isOnline);
  };
  useEffect(() => {
    chatApi.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    /** specify how to clean up after this effect */
    return () => {
      chatApi.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
    /** optimizing performance by skipping effects */
  }, [props.friend.id]);
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
};

/** use multiple effects to separate concerns */
class MultipleEffectsClassExample extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    chatApi.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentWillUnmount() {
    chatApi.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline,
    });
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
        <p>
          {this.state.isOnline === null
            ? 'Loading...'
            : this.state.isOnline
            ? 'Online'
            : 'Offline'}
        </p>
      </div>
    );
  }
}

const MultipleEffectsHookExample = (props) => {
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
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </button>
      <p>
        {isOnline === null ? 'Loading...' : isOnline ? 'Online' : 'Offline'}
      </p>
    </div>
  );
};

const UsingTheEffectHook = () => {
  return (
    <>
      <EffectsWithoutCleanupClassExample />
      <EffectsWithoutCleanupHookExample />
      <EffectsWithCleanupClassExample friend={{ id: 1 }} />
      <EffectsWithCleanupHookExample friend={{ id: 2 }} />
      <MultipleEffectsClassExample friend={{ id: 3 }} />
      <MultipleEffectsHookExample friend={{ id: 4 }} />
    </>
  );
};

export default UsingTheEffectHook;
