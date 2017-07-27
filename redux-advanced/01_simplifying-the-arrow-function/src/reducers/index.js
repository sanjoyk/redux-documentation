//redine reducers
import { combineReducers } from 'redux';
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
    console.log('in visibility filter, filter = ', action.filter);
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};
const todosApp = combineReducers({
    todos,
    visibilityFilter
});
export default todosApp;
