import React from 'react';
import { Button, Space } from 'antd-mobile';
import deepClone from '../js/deepClone';

const JSPlayground = () => {
  const handleDeepClone =() => {

  };

  return (
    <div style={st.container}>
      <div style={st.btnWrap}>
        <Space>
          <Button onClick={handleDeepClone} color='primary'>深拷贝</Button>
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
