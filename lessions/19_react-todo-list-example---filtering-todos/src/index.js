import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';

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
            state.completed = !state.completed;
            return state;
        // return {
        //     ...state,
        //     completed: !state.completed
        // };
        default:
            return state;
    }
};
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SHOW_VISIBILITY_FILTER':
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
const store = createStore(todoApp);
console.log(store.getState());

const render = () => {
    console.log(store.getState());
    ReactDOM.render(
        <TodoApp {...store.getState()} />,
        document.getElementById('root')
    );
};
const FilterLink = ({ filter, currentFilter, children }) => {
    if (currentFilter === filter) {
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
                store.dispatch({
                    type: 'SHOW_VISIBILITY_FILTER',
                    filter
                });
            }}
        >
            {children}
        </a>
    );
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
let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
        const { todos, visibilityFilter } = this.props;
        const visibleTodos = getVisibilityTodos(todos, visibilityFilter);
        return (
            <div>
                <input type="text" ref={node => (this.addTodoInput = node)} />
                <button
                    onClick={() =>
                        store.dispatch({
                            type: 'ADD_TODO',
                            id: nextTodoId++,
                            text: this.addTodoInput.value
                        })}
                >
                    add todo
                </button>
                <ul>
                    {visibleTodos.map(todo => {
                        return (
                            <li
                                key={todo.id}
                                onClick={() => {
                                    store.dispatch({
                                        type: 'TOGGLE_TODO',
                                        id: todo.id
                                    });
                                }}
                                style={{
                                    textDecoration: todo.completed
                                        ? 'line-through'
                                        : 'none'
                                }}
                            >
                                {todo.text}
                            </li>
                        );
                    })}
                </ul>
                <p>
                    Show :{' '}
                    <FilterLink
                        filter="SHOW_ALL"
                        currentFilter={visibilityFilter}
                    >
                        All
                    </FilterLink>{' '}
                    <FilterLink
                        filter="SHOW_ACTIVE"
                        currentFilter={visibilityFilter}
                    >
                        Active
                    </FilterLink>{' '}
                    <FilterLink
                        filter="SHOW_COMPLETED"
                        currentFilter={visibilityFilter}
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>
        );
    }
}
store.subscribe(render);
render();
registerServiceWorker();
