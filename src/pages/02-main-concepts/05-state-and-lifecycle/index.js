import { Component } from 'react';

/** the data flows down */
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

/** converting a function to a class */
class Clock extends Component {
  /** adding local state to a class */
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  /** adding lifecycle methods to a class */
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

/** using state correctly */
class UsingStateCorrectly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
      counter: 0,
    };
  }

  componentDidMount() {
    /** do not modify state directly */
    this.setState({ comment: 'Hello' });
    /** state updates may be asynchronous */
    this.setState((state, props) => ({
      counter: state.counter + props.increment,
    }));
    /** state updates are merged */
    const fetchPosts = () =>
      new Promise((resolve, reject) => {
        resolve({ posts: ['post1', 'post2'] });
      });
    const fetchComments = () =>
      new Promise((resolve, reject) => {
        resolve({ comments: ['comment1', 'comment2'] });
      });
    fetchPosts().then((response) => {
      this.setState({ posts: response.posts });
    });
    fetchComments().then((response) => {
      this.setState({ comments: response.comments });
    });
  }

  render() {
    return <>{JSON.stringify(this.state)}</>;
  }
}

class StateAndLifecycle extends Component {
  render() {
    return (
      <div>
        <Clock />
        <Clock />
        <Clock />
        <UsingStateCorrectly increment={1} />
      </div>
    );
  }
}

export default StateAndLifecycle;
