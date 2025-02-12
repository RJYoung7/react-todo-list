import React from "react";

export default function TodoItem({ task }) {
  console.log(task);
  return (
    <li>
      <input type="checkbox" />
      <span>{task.text}</span>
    </li>
  );
}
