import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

// TodoList component
function TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete} // pass the toggleComplete function
          deleteTodo={deleteTodo} // pass the deleteTodo function
          editTodo={editTodo} // pass the editTodo function
        />
      ))}
    </ul>
  );
}
export default TodoList;