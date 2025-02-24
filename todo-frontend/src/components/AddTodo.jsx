import React, { useState } from "react";
import styles from "./AddTodo.module.css";

// AddTodo component
function AddTodo({ addTodo }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, dueDate);
      setText("");
      setDueDate("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you have in mind?"
      />
      <input
        type="date"
        className={styles.dateInput}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" className={styles.button}>Add</button>
    </form>
  );
}

export default AddTodo;