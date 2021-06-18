import TicTacToeGame from "pages/01-tic-tac-toe-game";
import HelloWorld from "pages/02-main-concepts/01-hello-world";
import IntroducingJSX from "pages/02-main-concepts/02-introducing-jsx";

import Context from "pages/03-advanced-guides/03-context";

const routes = [
  { path: "/01-tic-tac-toe-game", component: TicTacToeGame },
  { path: "/02-main-concepts/01-hello-world", component: HelloWorld },
  { path: "/02-main-concepts/02-introducing-jsx", component: IntroducingJSX },
  { path: "/03-advanced-guides/03-context", component: Context },
];

export default routes;
