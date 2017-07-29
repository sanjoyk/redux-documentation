import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';

import TodoList from '../components/todoList';
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return [...todos];
    }
};
const mapStateToTodoListProps = (state, { match }) => ({
    todos: getVisibleTodos(state.todos, match.params.filter)
});

const VisibleTodoList = withRouter(
    connect(mapStateToTodoListProps, { onTodoClick: toggleTodo })(TodoList)
);

export default VisibleTodoList;
