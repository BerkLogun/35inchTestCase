import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import './bootstrap.min.css';

import newsReducer from './reducer/newsReducer';
import userReducer from './reducer/usersReducer';

const reducers = combineReducers({
  news: newsReducer,
  users: userReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


