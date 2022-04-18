import React, { useEffect, useState } from 'react';
import StoreContext from './context';

/**
 * 将子组件用context 包裹住, 接收store, 监听store变化
 * 需要把整个store 传递下去, 因为connect的mapStateTOProps 和 mapDispatchToProps都需要用到
 */
const Provider = (props) => {
  // const [storeState, setStoreState] = useState(props.store.getState());

  // useEffect(() => {
  // const store = props.store;

  //   store.subscribe(() => {
  //     const newStoreState = store.getState();
  //     setStoreState((providerState) => {
  //       if (providerState.storeState === newStoreState) {
  //         return null;
  //       }
  //       return {
  //         storeState: newStoreState,
  //       };
  //     });
  //   });
  // }, []);

  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default Provider;
