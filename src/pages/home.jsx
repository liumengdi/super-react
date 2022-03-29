import React from 'react';
import { Button, Space } from 'antd-mobile';


const HomePge = () => {
  const onPressBt1 = () => {

  };

  const onPressBt2 = () => {

  };


  return (
    <div style={st.container}>
      <div style={st.btnWrap}>
        <Space>
          <Button onClick={onPressBt1} color='primary'>bt1</Button>
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
