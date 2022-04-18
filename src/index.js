import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as BrowserRouterV5 } from 'react-router-domV5';
// import { Provider } from 'react-redux';
import { Provider } from './lib/mdRedux';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouterV5>
        <App />
      </BrowserRouterV5>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
