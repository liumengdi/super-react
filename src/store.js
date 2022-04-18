// import { createStore, combineReducers } from 'redux';
import { createStore, combineReducers } from './lib/mdRedux';
import { todoReducer } from './pages/todoApp';

const reducer = combineReducers({
  todos: todoReducer,
});


const store = createStore(reducer, {});

export default store;
