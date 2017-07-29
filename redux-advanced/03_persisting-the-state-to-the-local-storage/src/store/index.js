import { createStore } from 'redux';
import todosApp from '../reducers';
import throttle from 'lodash/throttle';
import { saveState, loadState } from '../localstorage/localstorage';
const persistedStore = loadState();
const store = createStore(todosApp, persistedStore);
store.subscribe(
    throttle(() => {
        saveState({ todos: store.getState().todos });
    }, 1000)
);
export default store;
