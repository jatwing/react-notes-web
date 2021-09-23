import { Component } from 'react';

class RenderingElements extends Component {
  render() {
    const element = <h1>Hello, world!</h1>;
    return <>{element}</>;
  }
}

export default RenderingElements;
