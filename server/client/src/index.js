import React from 'react';
import ReactDOM from 'react-dom';
// import logger from "redux-logger";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/App';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers, {}, composeWithDevTools(/*applyMiddleware(logger)*/))}>
    <App />
  </Provider>, 
  document.getElementById('root')
);