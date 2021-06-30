/** basic list component */
/** keys */
/** embedding map() in jsx */
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number.toString()}>{number}</li>
      ))}
    </ul>
  );
}

function TodoList(props) {
  const todos = props.todos;
  const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
  return <ul>{todoItems}</ul>;
}

/** extracting components with keys */
function ListItem(props) {
  return <li>{props.value}</li>;
}

function AnotherNumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

/** keys must only be unique among siblings */
function Post(props) {
  const { title, content } = props;
  return (
    <>
      <h3>{title}</h3>
      <p>{content}</p>
    </>
  );
}

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
  const content = props.posts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
      content={post.content}
    />
  ));

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

/** rendering multiple components */
function ListsAndKeys() {
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  const todos = [
    { id: 1, text: 'first todo' },
    { id: 2, text: 'second todo' },
    { id: 3, text: 'third todo' },
  ];
  const posts = [
    { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
    {
      id: 2,
      title: 'Installation',
      content: 'You can install React from npm.',
    },
  ];

  return (
    <>
      <ul>{listItems}</ul>
      <NumberList numbers={numbers} />
      <TodoList todos={todos} />
      <AnotherNumberList numbers={numbers} />
      <Blog posts={posts} />
    </>
  );
}

export default ListsAndKeys;
