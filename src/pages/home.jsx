import React from 'react';
import { Button, Space } from 'antd-mobile';

const HomePge = (props) => {
  const toJsPlayground = () => {
    props.history.push('/jsPlayground');
  };

  const toTodoApp = () => {
    props.history.push('/todoApp');
  };

  const toAmis = () => {
    props.history.push('/amis');
  };

  return (
    <div style={st.container}>
      <div style={st.btnWrap}>
        <Space>
          <Button onClick={toJsPlayground} color='primary'>JsPlayground</Button>
          <Button onClick={toTodoApp} color='primary'>redux-todoApp</Button>
          <Button onClick={toAmis} color='primary'>amis</Button>
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
