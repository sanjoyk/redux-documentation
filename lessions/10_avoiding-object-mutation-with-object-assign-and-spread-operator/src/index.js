import registerServiceWorker from './registerServiceWorker';

import expect from 'expect';
import deepFreeze from 'deep-freeze';

const toggleTodo = todo => {
    // return {
    //     id: todo.id,
    //     text: todo.text,
    //     completed: !todo.completed
    // };

    // return Object.assign({}, todo, {
    //     completed: !todo.completed
    // });

    return {
        ...todo,
        completed: !todo.completed
    };
};
const testToggleTodo = () => {
    const todoBefore = {
        id: 0,
        text: 'learn redux',
        completed: false
    };
    const todoAfter = {
        id: 0,
        text: 'learn redux',
        completed: true
    };
    deepFreeze(todoBefore);
    toggleTodo(todoBefore);
    expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};
testToggleTodo();
console.log('all test passed');
registerServiceWorker();
