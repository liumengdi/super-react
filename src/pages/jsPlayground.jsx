import React from 'react';
import { Button, Space } from 'antd-mobile';
import deepClone from '../js/deepClone';
import { promiseBasic1, promiseBasic2 } from '../js/arrayFunctions';

const JSPlayground = () => {
  const handleDeepClone =() => {

  };

  const handleAsyncProgramming = () => {
    // promiseBasic1();
    promiseBasic2();
  };

  return (
    <div style={st.container}>
      <div style={st.btnWrap}>
        <Space>
          <Button onClick={handleDeepClone} color='primary'>深拷贝</Button>
          <Button onClick={handleAsyncProgramming} color='primary'>异步</Button>
        </Space>
      </div>
    </div>
  );
};

export default JSPlayground;


const st = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 20,
  },
  btnWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrapper: 'wrap',

  },
};
