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

  // Function to filter tasks based on their status
  // This function takes a status parameter which can be "all", "active", or "completed"
  // It returns an array of tasks that match the specified status
  // If the status is "all", it returns all tasks
  // If the status is "active", it returns tasks that are not completed
  // If the status is "completed", it returns tasks that are completed
  // This allows the user to filter tasks based on their completion status
  // The filterTasks function is used to filter the tasks based on their status
  // It uses the filter method to create a new array of tasks that match the specified status
  // The filter method creates a new array with all elements that pass the test implemented by the provided function
  // In this case, the test checks if the task's completed property matches the specified status
  // The filter method returns a new array with the filtered tasks
  // This allows the user to view only the tasks that match the specified status
  // The filterTasks function is called when the user clicks on the "All", "Active", or "Completed" buttons
  // to update the displayed tasks based on their completion status
  // The filterTasks function is not called directly in the code
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
      // Check if the task id matches the one we want to toggle
      // If it does, toggle its completed status
      // Otherwise, return the task as is
      // This is done using the map function which creates a new array
      // with the updated task
      // The spread operator (...) is used to create a copy of the task object
      // and update only the completed property
      // This ensures that we do not mutate the original task object
      // which is important for maintaining immutability in React
      // and for performance reasons
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

  // useEffect(() => {
  //   const tasks = filterTasks(filter);
  // }, [filter]);

  return (
    <div>
      <header>
        <h1>Todo List</h1>
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
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
            tasks={filterTasks(filter)}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
            setTasks={setTasks}
          />
        </ul>
      </header>
    </div>
  );
}

export default App;
