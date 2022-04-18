/**
 *  接收reducer函数,
 */

const createStore = (reducer) => {
  let currentState;
  const listeners = [];

  const getState = () => currentState;

  const dispatch = (action) => {
    currentState = reducer(currentState, action);
    // listeners 就是监听的函数
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  // 初始化一下
  dispatch('@@redux/INIT');

  return {
    getState,
    subscribe,
    dispatch,
  };
};

export default createStore;
