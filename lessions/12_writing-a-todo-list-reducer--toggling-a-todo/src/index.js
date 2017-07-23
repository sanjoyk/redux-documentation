import registerServiceWorker from './registerServiceWorker';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (action.id !== todo.id) {
                    return todo;
                }
                return {
                    ...todo,
                    completed: !todo.completed
                };
            });
        default:
            return state;
    }
};
const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(todos(stateBefore, action)).toEqual(stateAfter);
};
const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'learn React',
            completed: false
        }
    ];
    const stateAfter = [
        {
            id: 0,
            text: 'learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'learn React',
            completed: true
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(todos(stateBefore, action)).toEqual(stateAfter);
};
testAddTodo();
testToggleTodo();

console.log('all test passed');
registerServiceWorker();
