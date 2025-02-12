import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, toggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} toggleTask={toggleTask} />
      ))}
    </ul>
  );
}
