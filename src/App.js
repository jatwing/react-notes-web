import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./home";
import TicTacToeGame from "./01-tic-tac-toe-game";
import HelloWorld from "./02-main-concepts/01-hello-world";
import IntroducingJSX from "./02-main-concepts/02-introducing-jsx"

import Context from "./03-advanced-guides/03-context";

// here i try to define a list that can be exported

const routes = [
  { path: "/", component: HomePage },
  { path: "/01-tic-tac-toe-game", component: TicTacToeGame },
  { path: "/02-main-concepts/01-hello-world", component: HelloWorld },
  { path: "/02-main-concepts/02-introducing-jsx", component: IntroducingJSX },


  { path: "/03-advanced-guides/03-context", component: Context },

];

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((r) => (
            <Route exact path={r.path} component={r.component} key={r.path} />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default App;
export { routes };
