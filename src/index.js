import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as BrowserRouterV5 } from 'react-router-domV5';

const s = { 'a': 1 };

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouterV5>
      <App />
    </BrowserRouterV5>
  </React.StrictMode>,
  document.getElementById('root'),
);
