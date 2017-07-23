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
    ReactDOM.render(
        <TodoApp todos={store.getState().todos} />,
        document.getElementById('root')
    );
};
let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
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
                    {this.props.todos.map(todo => {
                        return (
                            <li>
                                {todo.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
store.subscribe(render);
render();
registerServiceWorker();
