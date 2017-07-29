//redine reducers
import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
const todosApp = combineReducers({
    todos,
    visibilityFilter
});
export default todosApp;
