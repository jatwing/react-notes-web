import { useState } from 'react';

/** containment */
const FancyBorder = (props) => {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
};

/** specialization */
const Dialog = (props) => {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
};

/*
 * create genral component
 * pass props to create specific component
 *
 * children is also an props
 */

const WelcomeDialog = () => {
  return (
    <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
  );
};

const SignUpDialog = () => {
  const [login, setLogin] = useState('');
  const handleChange = (event) => {
    setLogin(event.target.value);
  };
  const handleClick = () => {
    alert(`Welcome aboard, ${login}!`);
  };

  return (
    <Dialog
      title="Mars Exploration Program"
      message="How should we refer to you?"
    >
      <input value={login} onChange={handleChange} />
      <button onClick={handleClick}> Sign Me Up! </button>
    </Dialog>
  );
};

const Contacts = () => {
  return <p>Contacts</p>;
};

const Chat = () => {
  return <p>Chat</p>;
};

const SplitPane = (props) => {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left} </div>
      <div className="SplitPane-right">{props.right} </div>
    </div>
  );
};

const App = () => {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
};

const CompositionVsInheritance = () => {
  return (
    <>
      <WelcomeDialog />
      <App />
      <SignUpDialog />
    </>
  );
};

export default CompositionVsInheritance;
