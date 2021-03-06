import { createStore } from 'redux';
import todosApp from '../reducers';
import throttle from 'lodash/throttle';
import { saveState, loadState } from '../localstorage/localstorage';
const addLoggingToDispatch = store => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch;
    }
    return action => {
        console.group(action.type);
        console.log('%c prev state', 'gray', store.getState());
        console.log('%c action', 'blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};
const configureStore = () => {
    const persistedStore = loadState();
    const store = createStore(todosApp, persistedStore);
    store.subscribe(
        throttle(() => {
            saveState({ todos: store.getState().todos });
        }, 1000)
    );
    store.dispatch = addLoggingToDispatch(store);
    return store;
};

export default configureStore;
