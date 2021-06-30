import TicTacToeGame from 'pages/01-tic-tac-toe-game';
import HelloWorld from 'pages/02-main-concepts/01-hello-world';
import IntroducingJSX from 'pages/02-main-concepts/02-introducing-jsx';
import RenderingElements from 'pages/02-main-concepts/03-rendering-elements';
import ComponentsAndProps from 'pages/02-main-concepts/04-components-and-props';
import StateAndLifecycle from 'pages/02-main-concepts/05-state-and-lifecycle';
import HandlingEvents from 'pages/02-main-concepts/06-handling-events';
import ConditionalRendering from 'pages/02-main-concepts/07-conditional-rendering';
import ListsAndKeys from 'pages/02-main-concepts/08-lists-and-keys';
import Forms from 'pages/02-main-concepts/09-forms';
import LiftingStateUp from 'pages/02-main-concepts/10-lifting-state-up';
import CompositionVsInheritance from 'pages/02-main-concepts/11-composition-vs-inheritance';
import ThinkingInReact from 'pages/02-main-concepts/12-thinking-in-react';

import Accessibility from 'pages/03-advanced-guides/01-accessibility'


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
  {
    path: '/02-main-concepts/08-lists-and-keys',
    component: ListsAndKeys,
  },

  {
    path: '/02-main-concepts/09-forms',
    component: Forms,
  },
  {
    path: '/02-main-concepts/10-lifting-state-up',
    component: LiftingStateUp,
  },
  {
    path: '/02-main-concepts/11-composition-vs-inheritance',
    component: CompositionVsInheritance,
  },
  {
    path: '/02-main-concepts/12-thinking-in-react',
    component: ThinkingInReact,
  },
  {
    path: '/03-advanced-guides/01-accessibility',
    component: Accessibility
  },

  { path: '/03-advanced-guides/03-context', component: Context },
];

export default routes;
