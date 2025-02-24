import React, { useState } from "react";
import styles from "./TodoItem.module.css";

// TodoItem component
function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || "");

  console.log("Todo Item:", todo); // log the todo item

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, editedText, editedDueDate);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={`${styles.listItem} ${todo.completed ? styles.completed : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
        </>
      ) : (
        <>
          {todo.text} {todo.dueDate && `(Due: ${todo.dueDate})`}
        </>
      )}
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.completeButton}`}
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button
          className={`${styles.button} ${styles.editButton}`}
          onClick={handleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;