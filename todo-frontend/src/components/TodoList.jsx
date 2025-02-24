import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

function TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo} // Pass the editTodo function
        />
      ))}
    </ul>
  );
}
export default TodoList;