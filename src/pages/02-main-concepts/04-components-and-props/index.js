function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

/** extracting components  */

function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img src={props.user.avatarUrl} alt={props.user.name} className="Avatar" />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

/** props are read-only */
function sum(a, b) {
  return a + b;
}

function withdraw(account, amount) {
  account.total -= amount;
}

function ComponentsAndProps() {
  const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
      name: 'Hello Kitty',
      avatarUrl:
        '/images/pages/02-main-concepts/04-components-and-props/avatar.jpg',
    },
  };
  const c = sum(1, 1);
  const account = { total: 2 };
  withdraw(account, 1);

  return (
    <>
      <App />
      <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}
      />

      {c + ' ' + JSON.stringify(account)}
    </>
  );
}

export default ComponentsAndProps;
