import React, { useEffect, useState } from 'react';
import StoreContext from './context';

/**
 *
 * @param  mapStateToProps 就是connect接收的mapStateToProps参数
 * @param mapDispatchToProps 就是connect接收的mapDispatchToProps参数
 * @returns  返回一个函数, component组件, 返回一个组件, component组件的props做处理, 给它添加数据和dispatch方法
 */
const Connect = (mapStateToProps, mapDispatchToProps) => {
  return (TodoApp) => {
    const ConnectWrap = (props) => {
      // const [propState, setPropState] = useState(null);
      const [statet, setStatet] = useState(props.store.getState());
      console.log('props=======', props);

      console.log('in-connect-mapDispatch', mapDispatchToProps(props.store.dispatch));

      useEffect(() => {
        props.store.subscribe((state) => {
          setStatet(state);
        });
      }, []);

      // 被包裹的组件,可以用这种方式给它添加参数
      // 为什么不在这里直接返回了TODOAPP呢, 因为这里没有store?
      return (
        <TodoApp
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
          {(store) => <ConnectWrap store={store} {...props} />}
        </StoreContext.Consumer>
      );
    };
    return ConnectComponent;
  };
};

export default Connect;


/**
<ConnectComponent>
  <ConnectWrap store={store} {...props}>
    <TodoApp {...props} />
  </ConnectWrap>
</ConnectComponent>

 */
