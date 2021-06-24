import { Component, createElement } from 'react';

/*
 * embedding expressions in JSX
 */
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez',
};
const element1 = <h1>Hello, {formatName(user)}</h1>;

/*
 * JSX is an Expression too
 */
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  } else {
    return <h1>Hello, Stranger.</h1>;
  }
}

/*
 * specifying attributes with JSX
 */
const element2 = <div tabIndex="0"></div>;
const element3 = <img src={user.avatarUrl} />;

/*
 * specifying children with JSX
 */
const element4 = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

/*
 * JSX prevents injection attacks
 */
const response = {
  potentiallyMaliciousInput: 'potentiallyMaliciousInput',
};
const title = response.potentiallyMaliciousInput;
const element5 = <h1>{title}</h1>;

/*
 * JSX represents objects
 */

const element6 = <h1 className="greeting">Hello, world!</h1>;
const element7 = createElement('h1', { className: 'greeting' }, 'Hello, world');

class IntroducingJSX extends Component {
  render() {
    return (
      <>
        {element1}
        {element2}
        {element3}
        {element4}
        {element5}
        {element6}
        {element7}
      </>
    );
  }
}

export default IntroducingJSX;
