import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import "./styles/index.scss";
import App from './App';
import store from './store';
import { getAllPosts } from './actions/post';
import { getUsers } from './actions/users';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(getUsers());
store.dispatch(getAllPosts());
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
