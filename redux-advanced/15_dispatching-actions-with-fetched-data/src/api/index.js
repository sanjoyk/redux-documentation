import { v4 } from 'node-uuid';
const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'sanjoy',
            completed: true
        },
        {
            id: v4(),
            text: 'sankirtan',
            completed: false
        },
        {
            id: v4(),
            text: 'ram',
            completed: false
        },
        {
            id: v4(),
            text: 'joy',
            completed: false
        }
    ]
};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
    delay(500).then(() => {
        switch (filter) {
            case 'all':
                return fakeDatabase.todos;
            case 'active':
                return fakeDatabase.todos.filter(todo => !todo.completed);
            case 'completed':
                return fakeDatabase.todos.filter(todo => todo.completed);
            default:
                throw new Error(`unknown filter : ${filter}`);
        }
    });
