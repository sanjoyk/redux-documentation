import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import registerServiceWorker from './registerServiceWorker';

let nextTodoId = 0;
//redine reducers
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                text: action.text,
                id: action.id,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
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
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo(state, action)];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
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
class TodoApp extends React.Component {
    render() {
        const todos = store.getState().todos;
        return (
            <div>
                <input type="text" ref={node => (this.input = node)} />
                <input
                    type="button"
                    value="Add Todo"
                    onClick={e => {
                        e.preventDefault();
                        console.log(this.input.value);
                        store.dispatch({
                            type: 'ADD_TODO',
                            text: this.input.value,
                            id: nextTodoId++
                        });
                    }}
                />
                {/* show todos */}
                <ul>
                    {todos.map(todo =>
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
                    )}
                </ul>
            </div>
        );
    }
}
const renders = () => {
    ReactDOM.render(<TodoApp />, document.getElementById('root'));
};
const todosApp = combineReducers({
    todos
});
const store = createStore(todosApp);
store.subscribe(renders);
renders();

registerServiceWorker();
