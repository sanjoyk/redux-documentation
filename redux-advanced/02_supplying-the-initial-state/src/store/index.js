import { createStore } from 'redux';
import todosApp from '../reducers';
const persistedStore = {
    todos: [
        {
            id: 0,
            text: 'initial data',
            completed: false
        }
    ]
};
const store = createStore(todosApp, persistedStore);
export default store;
