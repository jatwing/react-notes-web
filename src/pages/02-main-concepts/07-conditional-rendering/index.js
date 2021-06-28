/**
 * conditional rendering
 */
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

/** element variables */
function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
};

function LogoutButton(props) { 
  return <button onClick={props.onClick}>Logout</button>;
};


//@see https://reactjs.org/docs/conditional-rendering.html








function  ConditionalRendering() {
  return (
    <>
      <Greeting isLoggedIn={false} />
    </>
  );
};

export default ConditionalRendering;
