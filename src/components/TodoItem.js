import React from "react";

export default function TodoItem({ task, toggleTask }) {
  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={() => toggleTask(task.id)}>{task.text}</span>
    </li>
  );
}
