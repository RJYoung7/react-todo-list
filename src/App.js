import React, { useEffect, useState } from "react";
import "./index.css";
import TodoList from "./components/TodoList";
function App() {
  // State for all tasks
  const [tasks, setTasks] = useState([]);

  // Local state for the input field
  const [newTask, setNewTask] = useState("");

  const [filter, setFilter] = useState("all");
  // Function to add a new task
  // This function takes an event as a parameter
  // It prevents the default form submission behavior
  // It checks if the newTask is not empty
  // If it's not empty, it creates a new task object with a unique id, text, and completed status

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

  const filterTasks = (status) => {
    if (status === "all") return tasks;
    if (status === "active") return tasks.filter((task) => !task.completed);
    if (status === "completed")
      return tasks.filter(
        (task) => task.completed === (status === "completed")
      );
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

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
            name="newTask"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
          />
          <button type="submit">Add</button>
        </form>

        <div className="filter-group">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>

        <TodoList
          tasks={filterTasks(filter)}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
          setTasks={setTasks}
        />
      </header>
    </div>
  );
}

export default App;
