import HomePage from '../pages/home.jsx';
import JSPlayground from '../pages/jsPlayground.jsx';
import TodoApp from '../pages/todoApp';

const routeNames = [{
  path: '/',
  component: HomePage,
}, {
  path: '/jsPlayground',
  component: JSPlayground,
}, {
  path: '/todoApp',
  component: TodoApp,
}];

export default routeNames;
