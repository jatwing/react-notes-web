import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "layout";
import { getSubtrees, getSubsubtrees } from "utils/path-helper";
import routes from "config/routes";
import ParentNode from "pages/parent-node";

const subtrees = getSubtrees(routes.map((r) => r.path));

const parentNodeRoutes = subtrees.map((t) => {
  const subsubtrees = getSubsubtrees(t, subtrees)
  return ({
    exact: true,
    path: t.path || "/",
    render: () => <ParentNode subtree={t} subsubtrees={subsubtrees} />,
    key: t.path || "/",
  });
});

const leafRoutes = routes.map((r) => ({
  exact: true,
  path: r.path,
  component: r.component,
  key: r.path,
}));

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            {parentNodeRoutes.map((r) => (
              <Route {...r} />
            ))}
            {leafRoutes.map((r) => (
              <Route {...r} />
            ))}
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
