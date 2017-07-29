import { combineReducers } from 'redux';
import todo from './todo';

const byIds = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            };
        default:
            return state;
    }
};
const allIds = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.id];
        default:
            return state;
    }
};

const todos = combineReducers({
    byIds,
    allIds
});
// const todos = (state = [], action) => {
//     switch (action.type) {
//         case 'ADD_TODO':
//             return [...state, todo(state, action)];
//         case 'TOGGLE_TODO':
//             return state.map(t => todo(t, action));
//         default:
//             return state;
//     }
// };
const getAllTodos = state => {
    return state.allIds.map(id => state.byIds[id]);
};
export const getVisibleTodos = (state, filter) => {
    const todos = getAllTodos(state);
    switch (filter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
};

export default todos;
