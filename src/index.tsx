import React from 'react';
import ReactDOM from 'react-dom/client';

import { CssBaseline } from '@mui/material';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';

import App from './App';

import './style/index.scss';
import './style/tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </Provider>,
);
