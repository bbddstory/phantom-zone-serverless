import '../node_modules/reset.css/reset.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import masterReducer from './reducers/masterReducer';

import { register } from './serviceWorker';
import App from './views/app';

// Create master store for all data
const masterStore = createStore(masterReducer, applyMiddleware(thunk));

// Log every state change
// NOTE: subscribe() returns a function for unregistering the listener
// const unsubscribe =
masterStore.subscribe(() => console.log(masterStore.getState()));

// Stop logging state changes
// unsubscribe()

ReactDOM.render(
  <HashRouter>
    <Provider store={masterStore}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);

register();
