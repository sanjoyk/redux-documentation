import registerServiceWorker from './registerServiceWorker';

const createStore = reducer => {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = listener => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
            console.log('listeners= ', listeners);
        };
    };
    dispatch({});
    return { getState, dispatch, subscribe };
};
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};
const store = createStore(counter);
console.log(store);
const render = () => {
    document.body.innerText = store.getState();
};
store.subscribe(render);
render();
document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
});

registerServiceWorker();
