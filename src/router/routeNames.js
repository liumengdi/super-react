import HomePage from '../pages/home.jsx';
import JSPlayground from '../pages/jsPlayground.jsx';
import TodoApp from '../pages/todoApp';
import AmisApp from '../pages/amisApp';

const routeNames = [{
  path: '/',
  component: HomePage,
}, {
  path: '/jsPlayground',
  component: JSPlayground,
}, {
  path: '/todoApp',
  component: TodoApp,
}, {
  path: '/amis',
  component: AmisApp,
}];

export default routeNames;
