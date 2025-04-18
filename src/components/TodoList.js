import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, toggleTask, deleteTask, editTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}
