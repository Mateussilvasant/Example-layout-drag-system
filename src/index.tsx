import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { GlobalStyle } from './global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

