import React, { useEffect, useState } from 'react';
import StoreContext from './context';

const createConnect = (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {
    const Connect = (props) => {
      // const [propState, setPropState] = useState(null);
      const [statet, setStatet] = useState(props.store.getState());


      useEffect(() => {
        props.store.subscribe((state) => {
          setStatet(state);
        });
      }, []);

      return (
        <WrappedComponent
          {...props}
          {...mapStateToProps(statet)}
          {...mapDispatchToProps(props.store.dispatch)}
        />
      );
    };

    // 这里的props是被包裹组件的props
    const ConnectComponent = (props) => {
      console.log('ConnectComponent', props);
      return (
        <StoreContext.Consumer>
          {(store) => <Connect store={store} {...props}/>}
        </StoreContext.Consumer>
      );
    };
    return ConnectComponent;
  };
};

export default createConnect;
