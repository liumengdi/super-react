import React, { useEffect, useState } from 'react';
import StoreContext from './context';

const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {
    const Connect = () => {
      let connectStore;

      // const [propState, setPropState] = useState(null);

      return (
        <StoreContext.Consumer>
          {(store) => {
            store.subscribe(() => {
              console.log('store changed', store.getState());
              // setPropState(store.getState());
            });

            // TODO: 怎么拿到初始值
            // console.log('@@@connect-storeState:', store);
            console.log('@@@connect-storeState-getState:', store.getState().todos);
            return <WrappedComponent store={store} todos={store.getState().todos}/>;
          }}
        </StoreContext.Consumer>
      );
    };
    return Connect;
  };
};

export default connect;
