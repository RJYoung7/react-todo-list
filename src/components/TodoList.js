import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks }) {
  console.log(tasks);
  return (
    <ul>
      {tasks.map((task, id) => (
        <TodoItem key={id} task={task} />
      ))}
    </ul>
  );
}
