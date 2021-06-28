import TicTacToeGame from 'pages/01-tic-tac-toe-game';
import HelloWorld from 'pages/02-main-concepts/01-hello-world';
import IntroducingJSX from 'pages/02-main-concepts/02-introducing-jsx';
import RenderingElements from 'pages/02-main-concepts/03-rendering-elements';
import ComponentsAndProps from 'pages/02-main-concepts/04-components-and-props';
import StateAndLifecycle from 'pages/02-main-concepts/05-state-and-lifecycle';
import HandlingEvents from 'pages/02-main-concepts/06-handling-events'
import ConditionalRendering from 'pages/02-main-concepts/07-conditional-rendering'

import Context from 'pages/03-advanced-guides/03-context';

const routes = [
  { path: '/01-tic-tac-toe-game', component: TicTacToeGame },
  { path: '/02-main-concepts/01-hello-world', component: HelloWorld },
  { path: '/02-main-concepts/02-introducing-jsx', component: IntroducingJSX },
  {
    path: '/02-main-concepts/03-rendering-elements',
    component: RenderingElements,
  },
  {
    path: '/02-main-concepts/04-components-and-props',
    component: ComponentsAndProps,
  },
  {
    path: '/02-main-concepts/05-state-and-lifecycle',
    component: StateAndLifecycle,
  },
  {
    path: '/02-main-concepts/06-handling-events',
    component: HandlingEvents,
  },

  {
    path: '/02-main-concepts/07-conditional-rendering',
    component: ConditionalRendering,

  },


  { path: '/03-advanced-guides/03-context', component: Context },
];

export default routes;
