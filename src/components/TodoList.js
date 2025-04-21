import React from "react";
import { useRef } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({
  tasks,
  toggleTask,
  deleteTask,
  editTask,
  setTasks,
  ...handlers
}) {
  const draggedItem = useRef(null);
  const draggedOverItem = useRef(null);

  const handleReorder = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [moved] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, moved);
    setTasks(updatedTasks);
  };

  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <TodoItem
          key={task.id}
          index={index}
          task={task}
          onReorder={handleReorder}
          draggedItem={draggedItem}
          draggedOverItem={draggedOverItem}
          {...handlers}
        />
      ))}
    </ul>
  );
}
