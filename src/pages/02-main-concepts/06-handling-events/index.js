import { Component } from 'react';

function Form() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log('You Clicked submit.');
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class LoggingButton extends Component {
  handleClick () {
    console.log('this is:', this);
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}

class AnotherLoggingButton extends Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return <button onClick={() => this.handleClick()}>Click me</button>;
  }
}

/** passing arguments to event handlers */
class DeleteButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  }

  deleteRow(id, event) {
    this.setState((state) => ({
      rows: state.rows.filter((row) => row !== id),
    }));
    console.log(event);
  }

  render() {
    const id = this.state.rows[0];
    return (
      <>
        <button onClick={(event) => this.deleteRow(id, event)}>
          Delete Row
        </button>
        <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
        <p>{this.state.rows}</p>
      </>
    );
  }
}

function HandlingEvents() {
  return (
    <>
      <Form />
      <Toggle />
      <LoggingButton />
      <AnotherLoggingButton />
      <DeleteButtons />
    </>
  );
}

export default HandlingEvents;
