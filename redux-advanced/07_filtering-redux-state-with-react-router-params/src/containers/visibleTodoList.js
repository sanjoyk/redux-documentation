import { connect } from 'react-redux';
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
const mapStateToTodoListProps = (state, ownsProps) => ({
    todos: getVisibleTodos(state.todos, ownsProps.filter)
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
