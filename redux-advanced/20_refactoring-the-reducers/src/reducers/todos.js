import { combineReducers } from 'redux';

const byIds = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_TODOS':
            const nextState = { ...state };
            action.response.forEach(todo => {
                nextState[todo.id] = todo;
            });
            return nextState;
        default:
            return state;
    }
};
const allIds = (state = [], action) => {
    if (action.filter !== 'all') {
        return state;
    }
    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.response.map(todo => todo.id);
        default:
            return state;
    }
};
const activeIds = (state = [], action) => {
    if (action.filter !== 'active') {
        return state;
    }
    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.response.map(todo => todo.id);

        default:
            return state;
    }
};
const completedIds = (state = [], action) => {
    if (action.filter !== 'completed') {
        return state;
    }
    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.response.map(todo => todo.id);

        default:
            return state;
    }
};
const idsByFilter = combineReducers({
    all: allIds,
    active: activeIds,
    completed: completedIds
});
const todos = combineReducers({
    byIds,
    idsByFilter
});
//first time

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
export const getVisibleTodos = (state, filter) => {
    const ids = state.idsByFilter[filter];
    return ids.map(id => state.byIds[id]);
};

export default todos;
