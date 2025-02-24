const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const PORT = 4000;
// increase header size limit
const server = http.createServer(app);
server.maxHeadersCount = 2000;
// middleware

app.use(cors({
    origin: 'http://localhost:3000', // allow requests from the frontend
    credentials: true, // allow credentials (cookies) to be sent
})); // allow cross-origin requests

app.use(express.json()); // parse JSON bodies
 
// in-memory database for storing todos

let todos = [
    { id: 1, text: 'Wash dished', completed: true },
    { id: 2, text: 'Shopping', completed: false },
    { id: 3, text: 'Finish codecademy', completed: false }

]

// api endpoints

// GET / api / todos - returns all todo items
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

//POST / api / todos - add a new todo item
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,
    completed: false,
    dueDate: req.body.dueDate || null, // add due date 
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT / api / todos /: id - update a todo item

app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).json({ error: "todo item not found" });
  }
  todo.text = req.body.text || todo.text;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  todo.dueDate = req.body.dueDate || todo.dueDate; // update due date
  res.json(todo);
});
// PUT / api / todos /: id / edit - edit a todo item
app.put("/api/todos/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).json({ error: "todo not found" });
  }
  todo.text = req.body.text; // Update the text
  res.json(todo);
});

  // DELETE / api / todos /: id - delete a todo item
  app.delete("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "To-do item not found" });
    }
    todos.splice(index, 1);
    res.status(204).send();
  });

    // start the server

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });