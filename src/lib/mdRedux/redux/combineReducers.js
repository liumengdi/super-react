const combineReducers = (reducers) => {
  const nextState = {};
  let hasChanged = false;

  return (state = {}, action) => {
    Object.keys(reducers).forEach((key) => {
      const reducer = reducers[key];
      const prevStateForkey = state[key];

      nextState[key] = reducer(prevStateForkey, action);
      if (nextState[key] !== prevStateForkey) {
        hasChanged = true;
      }
    });
    console.log('@@@combineReducers', nextState, 'state', state);

    return hasChanged ? nextState : state;
    // return nextState;
  };
};

export default combineReducers;
