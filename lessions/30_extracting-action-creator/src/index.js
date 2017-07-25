import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (action.id !== state.id) {
                return state;
            }
            // state.completed = !state.completed;
            // return state;
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo(undefined, action)];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

//Actions
const setVisibilityFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};
const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};
const addTodo = text => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text: text
    };
};

const Link = ({ active, children, onClick }) => {
    if (active) {
        return (
            <span>
                {children}
            </span>
        );
    }
    return (
        <a
            href="#"
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
};

const mapStateToFooterLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
};
const mapDispatchToFooterLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    };
};
const FilterLink = connect(
    mapStateToFooterLinkProps,
    mapDispatchToFooterLinkProps
)(Link);

const Footer = () => {
    return (
        <p>
            Show : <FilterLink filter="SHOW_ALL">All</FilterLink>{' '}
            <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{' '}
            <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
        </p>
    );
};
Footer.contextTypes = {
    store: React.PropTypes.object
};
const getVisibilityTodos = (todos, visibilityFilter) => {
    switch (visibilityFilter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
};

const Todo = ({ text, onClick, completed }) => {
    return (
        <li
            onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {text}
        </li>
    );
};
const TodoList = ({ todos, onTodoClick }) => {
    return (
        <ul>
            {todos.map(todo =>
                <Todo
                    {...todo}
                    key={todo.id}
                    onClick={() => onTodoClick(todo.id)}
                />
            )}
        </ul>
    );
};
//visibilityFilter
const mapStateToProps = state => {
    return {
        todos: getVisibilityTodos(state.todos, state.visibilityFilter)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id));
        }
    };
};
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input type="text" ref={node => (input = node)} />
            <button
                onClick={() => {
                    dispatch(addTodo(input.value));
                    input.value = '';
                }}
            >
                add todo
            </button>
        </div>
    );
};
// AddTodo = connect(
//     state => {},
//     dispatch => {
//         return {
//             dispatch
//         };
//     }
// )(AddTodo);
AddTodo = connect()(AddTodo);

let nextTodoId = 0;
const TodoApp = () => {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
};

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
