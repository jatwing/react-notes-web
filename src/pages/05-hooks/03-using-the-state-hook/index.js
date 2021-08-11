/** what is a hook */
import { useState, Component } from 'react';

const Example = () => {
  /** declaring a state variable */
  const [count, setCount] = useState(0);
  /** reading state */
  /** updating state */
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

/** equivalent class example */
class EquivalentClassExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
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

/** using multiple state variables */
const ExampleWithManyStates = () => {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  const handleOrangeClick = () => {
    setFruit('orange');
  };
  return (
    <>
      <p>{age}</p>
      <p>{fruit}</p>
      <p>{todos.text}</p>
      <button onClick={handleOrangeClick}>Click me</button>
    </>
  );
};

const UsingTheStateHook = () => {
  return (
    <>
      <Example />
      <EquivalentClassExample />
      <ExampleWithManyStates />
    </>
  );
};

export default UsingTheStateHook;
