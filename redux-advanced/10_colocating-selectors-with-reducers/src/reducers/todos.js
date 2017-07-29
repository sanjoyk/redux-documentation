import todo from './todo';
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
export const getVisibleTodos = (state, filter) => {
    switch (filter) {
        case 'active':
            return state.filter(todo => !todo.completed);
        case 'completed':
            return state.filter(todo => todo.completed);
        default:
            return state;
    }
};

export default todos;
