import { createStore } from 'redux';
import todosApp from '../reducers';
const store = createStore(todosApp);
export default store;
