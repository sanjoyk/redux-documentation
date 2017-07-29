import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './containers/root';
import { fetchTodos } from './api';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
fetchTodos('all').then(todos => console.log(todos));
ReactDOM.render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();
