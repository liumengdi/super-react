import * as actionTypes from './actionsTypes';

const initialState = [{
  name: 'asdsa',
  checked: false,
}];

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ADD_TODO:
    return state.concat(action.payload);
  case actionTypes.TOGGLE_TODO:
    return state.map((todo, index) => {
      if (action.payload === todo.name) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      }
      return todo;
    });
  default:
    return state;
  }
};
