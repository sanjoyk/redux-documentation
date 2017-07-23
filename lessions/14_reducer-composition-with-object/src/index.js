import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';

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
const todoApp = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    };
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
const store = createStore(todoApp);
console.log(store.getState());

store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn React'
});
console.log(store.getState());
store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Learn Redux'
});
console.log(store.getState());
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 1
});
console.log(store.getState());
store.dispatch({
    type: 'SHOW_VISIBILITY_FILTER',
    filter: 'SHOW_ACTIVE'
});
console.log(store.getState());

console.log('all test passed');
registerServiceWorker();
