import React, { useEffect, useState } from 'react';
import { Button, Space, Input, Checkbox } from 'antd-mobile';
import { connect } from '../../../lib/mdRedux';
import moment from 'moment';
import * as actionTypes from '../actionsTypes';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss sss';

const TodoApp = (props) => {
  const [searchVal, setSearchVal] = useState('');

  const addTodo = () => {
    props.store.dispatch({
      type: actionTypes.ADD_TODO,
      payload: {
        name: moment().format(DATE_FORMAT),
        checked: false,
      },
    });
    // props.addTodo({
    //   name: moment().format(DATE_FORMAT),
    //   checked: false,
    // });
  };


  const handleCheckChange = (item) => {
    props.checkTodo(item.name);
  };

  const handleInputChange = (val) => {
    setSearchVal(val);
  };

  return (
    <div style={st.container}>
      <Space direction='vertical'>
        <div style={st.searchBar}>
          <Input
            placeholder="Search"
            value={searchVal}
            style={st.searchInput}
            onChange={handleInputChange}
          />
        </div>
        {/* {props.todoList?.filter((_) => _.name.includes(searchVal))?.map((item, i) => { */}
        {props.todos?.map((item, i) => {
          return <TodoItem key={item.name + i}
            name={item.name}
            checked={item.checked}
            onChange={() => handleCheckChange(item)}
          />;
        })}

      </Space>

      <Button color='primary' onClick={addTodo}>+</Button>

    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('@@@mapoStateToProps', state);
  return {
    todoList: state.todos,
  };
};

const mapDisaptchToProps = (dispatch) => {
  return {
    addTodo: (payload) => {
      dispatch({
        type: actionTypes.ADD_TODO,
        payload: payload,
      });
    },
    checkTodo: (payload) => {
      dispatch({
        type: actionTypes.TOGGLE_TODO,
        payload: payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDisaptchToProps)(TodoApp);


const TodoItem = (props) => {
  return (
    <div style={st.todoItem}>
      <Space>
        <Checkbox
          checked={props.checked}
          onChange={() => props.onChange()}
        />
        <div>{props.name}</div>
      </Space>

    </div>


  );
};


const st = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 20,
    overflow: 'scroll',
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    border: '1px solid #d9d9d9',
  },
};
