import React from 'react';
import { Button,Space } from 'antd-mobile';


const HomePge = () => {
  return (
    <div style={st.container}>
      <div style={st.btnWrap}>
        <Space>
          <Button color='primary'>Hello</Button>
          <Button color='primary'>Hello</Button>
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
    
  }
};