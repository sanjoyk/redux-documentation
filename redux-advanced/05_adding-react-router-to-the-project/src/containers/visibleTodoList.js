import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/todoList';
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed);
        default:
            return [...todos];
    }
};
const mapStateToTodoListProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToTodoListProps = dispatch => ({
    onClick(id) {
        dispatch(toggleTodo(id));
    }
});
const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);

export default VisibleTodoList;
