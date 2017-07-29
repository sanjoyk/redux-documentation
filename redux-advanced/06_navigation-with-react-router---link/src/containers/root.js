import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from '../components/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={TodoApp} />
            </Router>
        </Provider>
    );
};
export default Root;
