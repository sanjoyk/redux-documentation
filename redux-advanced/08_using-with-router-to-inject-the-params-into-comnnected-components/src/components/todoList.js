import React from 'react';
const TodoList = ({ todos, onClick }) => {
    console.log(todos);
    return (
        <div>
            <ul>
                {todos.map(todo => {
                    return (
                        <li
                            key={todo.id}
                            onClick={() => {
                                onClick(todo.id);
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
