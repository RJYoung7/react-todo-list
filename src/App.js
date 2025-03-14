import React, { useEffect, useState } from "react";
import "./index.css";
import TodoList from "./components/TodoList";
function App() {
  // State for all tasks
  const [tasks, setTasks] = useState([]);

  // Local state for the input field
  const [newTask, setNewTask] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Load tasks from localStorage when the component mounts
  // This ensures that the tasks are loaded when the app is first opened
  // and any previously saved tasks are displayed
  // The useEffect hook is used to perform side effects in functional components
  // The empty dependency array [] means this effect runs only once when the component mounts
  // The tasks are parsed from JSON and set to the state
  // This allows the app to persist tasks across page reloads
  // The tasks are stored in localStorage as a JSON string
  // so they can be retrieved and parsed back into an array of task objects
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  // Save tasks to localStorage whenever tasks change
  // This ensures that the tasks persist across page reloads
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <header>
        <h1>Todo List</h1>
        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
          />
          <button type="submit">Add</button>
        </form>

        <ul>
          <TodoList
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </ul>
      </header>
    </div>
  );
}

export default App;
