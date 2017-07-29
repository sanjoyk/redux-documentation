//redine reducers
import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';
const todosApp = combineReducers({
    todos
});
export const getVisibleTodos = (state, filter) => {
    return fromTodos.getVisibleTodos(state.todos, filter);
};

export default todosApp;
