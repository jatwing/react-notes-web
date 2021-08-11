/**
 * using the state hook
 */
import { useState, Component } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

class EquivalentExample extends Component {
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

const UsingTheStateHook = () => {
  return (
    <>
      <Example />
      <EquivalentExample />
    </>
  );
};

export default UsingTheStateHook;
