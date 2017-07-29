import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';
import TodoList from '../components/todoList';

class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.fetchData();
        }
    }
    fetchData() {
        const { receiveTodos, filter } = this.props;
        fetchTodos(this.props.filter).then(todos =>
            receiveTodos(filter, todos)
        );
    }
    render() {
        const { toggleTodo, ...rest } = this.props;
        return <TodoList {...rest} onTodoClick={toggleTodo} />;
    }
}
const mapStateToTodoListProps = (state, { match }) => {
    let filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
};
// { onTodoClick: toggleTodo }
VisibleTodoList = withRouter(
    connect(mapStateToTodoListProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
