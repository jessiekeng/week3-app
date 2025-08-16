// src/TaskItem.js
import React, { useState } from "react";
import { db } from "./firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "tasks", task.id), {
      title: newTitle,
      description: newDescription,
    });
    setIsEditing(false);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px 0" }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
