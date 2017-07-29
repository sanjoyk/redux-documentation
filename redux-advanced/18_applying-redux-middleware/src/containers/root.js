import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from '../components/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" exact component={TodoApp} />
                    <Route path="/:filter" component={TodoApp} />
                </div>
            </Router>
        </Provider>
    );
};
export default Root;
