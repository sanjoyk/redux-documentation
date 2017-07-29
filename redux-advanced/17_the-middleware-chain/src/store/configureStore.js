import { createStore } from 'redux';
import todosApp from '../reducers';

const logger = store => next => {
    if (!console.group) {
        return next;
    }
    return action => {
        console.group(action.type);
        console.log('%c prev state', 'gray', store.getState());
        console.log('%c action', 'blue', action);
        const returnValue = next(action);
        console.log('%c next state', 'green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};
const promise = store => next => action => {
    if (typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
};
const wrapDispatchWithMiddleware = (store, middlewares) => {
    middlewares
        .slice()
        .reverse()
        .forEach(
            middleware => (store.dispatch = middleware(store)(store.dispatch))
        );
};
const configureStore = () => {
    const store = createStore(todosApp);
    const middlewares = [promise];
    middlewares.push(logger);
    wrapDispatchWithMiddleware(store, middlewares);
    return store;
};

export default configureStore;
