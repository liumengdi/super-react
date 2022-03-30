import React from 'react';
import { Button, Space } from 'antd-mobile';
import deepClone from '../js/deepClone';

const HomePge = (props) => {
  const toJsPlayground = () => {
    props.history.push('/jsPlayground');
  };

  const onPressBt2 = () => {

  };


  return (
    <div style={st.container}>
      <div style={st.btnWrap}>
        <Space>
          <Button onClick={toJsPlayground} color='primary'>JsPlayground</Button>
          <Button onClick={onPressBt2} color='primary'>bt2</Button>
        </Space>

      </div>
    </div>
  );
};

export default HomePge;


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
