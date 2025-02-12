import React from "react";

export default function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={() => toggleTask(task.id)}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>X</button>
    </li>
  );
}
