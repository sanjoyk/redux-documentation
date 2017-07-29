import React from 'react';
const TodoList = ({ todos, onTodoClick }) => {
    console.log(todos);
    return (
        <div>
            <ul>
                {todos.map(todo => {
                    return (
                        <li
                            key={todo.id}
                            onClick={() => {
                                onTodoClick(todo.id);
                            }}
                            style={{
                                textDecoration: todo.completed
                                    ? 'line-through'
                                    : 'none'
                            }}
                        >
                            {todo.text}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default TodoList;
