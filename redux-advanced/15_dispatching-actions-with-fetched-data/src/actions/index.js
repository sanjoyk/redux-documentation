import { v4 } from 'node-uuid';
export const addTodo = text => ({
    type: 'ADD_TODO',
    text: text,
    id: v4()
});
export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});
export const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});
