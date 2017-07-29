import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './containers/root';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();
