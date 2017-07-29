import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';
import TodoList from '../components/todoList';

class VisibleTodoList extends Component {
    componentDidMount() {
        fetchTodos(this.props.filter).then(todos => console.log(todos));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            fetchTodos(this.props.filter).then(todos => console.log(todos));
        }
    }
    render() {
        return <TodoList {...this.props} />;
    }
}
const mapStateToTodoListProps = (state, { match }) => {
    let filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
};

VisibleTodoList = withRouter(
    connect(mapStateToTodoListProps, { onTodoClick: toggleTodo })(
        VisibleTodoList
    )
);

export default VisibleTodoList;
