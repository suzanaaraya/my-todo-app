import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/todos", {
        withCredentials: false, // disable cookies
      });
      console.log("Fetched todos:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching to-do items:", error);
    }
  };
// adding a new to-do item functinality
const addTodo = async (text, dueDate) => {
  try {
    const response = await axios.post("http://localhost:4000/api/todos", {
      text,
      dueDate,
    });
    setTodos([...todos, response.data]);
  } catch (error) {
    console.error("Error adding to-do item:", error);
  }
};
  // Mark a to-do item as completed
  const toggleComplete = async (id) => {
    try {
      console.log("toggling complete for todo id", id);
      const todo = todos.find((todo) => todo.id === id);
      const response = await axios.put(`http://localhost:4000/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating to-do item:", error);
    }
  };
  // Delete a to-do item
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting to-do item:", error);
    }
  };
  // for editing a to-do item functionality
  const editTodo = async (id, newText, newDueDate) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/todos/${id}/edit`, {
        text: newText,
        dueDate: newDueDate,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error editing to-do item:", error);
    }
  };


  return (
    <div className={`${styles.App} ${isDarkMode ? styles.darkMode : ""}`}>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1>Plan your Day!</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
}

export default App;