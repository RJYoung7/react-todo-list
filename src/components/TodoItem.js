// import React from "react";

// export default function TodoItem({ task, toggleTask, deleteTask, editTask }) {
//   return (
//     <li className={task.completed ? "completed" : ""}>
//       <span onClick={() => editTask(task.id)}>{task.text}</span>
//       <div className="button-group">
//         <button className="icon-button" onClick={() => toggleTask(task.id)}>
//           <img
//             src="../../assets/checkmark2.webp"
//             alt="Checkmark"
//             id="checkmark"
//           />
//         </button>
//         <button onClick={() => deleteTask(task.id)}>X</button>
//       </div>
//     </li>
//   );
// }

import { useState } from "react";

export default function TodoItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTask(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <li className={task.completed ? "completed" : ""}>
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

      <div className="button-group">
        <button className="icon-button" onClick={() => toggleTask(task.id)}>
          <img
            src="../../assets/checkmark2.webp"
            alt="Checkmark"
            id="checkmark"
          />
        </button>
        <button onClick={() => deleteTask(task.id)}>X</button>
      </div>
    </li>
  );
}
