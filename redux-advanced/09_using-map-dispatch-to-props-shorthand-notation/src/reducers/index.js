//redine reducers
import { combineReducers } from 'redux';
import todos from './todos';
const todosApp = combineReducers({
    todos
});
export default todosApp;
