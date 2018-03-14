import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import gradebookReducers from './Redux/reducers/reducers.js';
import sagas from './Redux/sagas.js';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  gradebookReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
