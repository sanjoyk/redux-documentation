import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from '../components/todoList';

const mapStateToTodoListProps = (state, { match }) => ({
    todos: getVisibleTodos(state, match.params.filter)
});

const VisibleTodoList = withRouter(
    connect(mapStateToTodoListProps, { onTodoClick: toggleTodo })(TodoList)
);

export default VisibleTodoList;
