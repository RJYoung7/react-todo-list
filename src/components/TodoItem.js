import { useState } from "react";

export default function TodoItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [isChecked, setIsChecked] = useState(task.completed);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTask(task.id, editedText);
    setIsEditing(false);
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    toggleTask(task.id);
  };

  const handleDelete = () => {
    setIsDeleting(true); // trigger CSS
    setTimeout(() => deleteTask(task.id), 800); // wait for animation
  };

  return (
    <li
      className={`todo-item ${task.completed ? "completed" : ""} ${
        isDeleting ? "imploding" : ""
      }`}
    >
      <div className="task-group">
        {/* <button className="icon-button" onClick={() => toggleTask(task.id)}>
          <img
            src="../../assets/checkmark2.webp"
            alt="Checkmark"
            id="checkmark"
          />
        </button> */}
        <div
          className={`checkbox ${task.completed ? "checked" : ""}`}
          onClick={handleCheckboxClick}
        >
          <svg className="checkmark-svg" viewBox="0 0 24 24">
            <path className="checkmark-path" d="M5 13L9 17L19 7" />
          </svg>
        </div>

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleEditSubmit}
              autoFocus
            />
          </form>
        ) : (
          <span onClick={() => setIsEditing(true)}>{task.text}</span>
        )}
      </div>

      <div className="button-group">
        {/* <button className="icon-button" onClick={() => toggleTask(task.id)}>
          <img
            src="../../assets/checkmark2.webp"
            alt="Checkmark"
            id="checkmark"
          />
        </button> */}
        {/* <button onClick={() => deleteTask(task.id)}>X</button> */}
        <button
          className="delete-button"
          onClick={(e) => {
            e.target.classList.add("button-pop");
            handleDelete();
          }}
        >
          X
        </button>
      </div>
    </li>
  );
}
