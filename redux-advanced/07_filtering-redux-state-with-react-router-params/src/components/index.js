import React from 'react';
import AddTodo from '../containers/addTodo';
import VisibleTodoList from '../containers/visibleTodoList';
import Footer from './footer';
const TodoApp = ({ match }) => {
    console.log('params');
    return (
        <div>
            <AddTodo />
            <VisibleTodoList filter={match.params.filter || 'all'} />
            <Footer />
        </div>
    );
};
export default TodoApp;
