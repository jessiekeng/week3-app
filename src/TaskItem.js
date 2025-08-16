import React from "react";
import { db } from "./firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const TaskItem = ({ task }) => {
  const toggleComplete = async () => {
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed
    });
  };

  const deleteTask = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  return (
    <div>
      <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </h3>
      <p>{task.description}</p>
      <button onClick={toggleComplete}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default TaskItem;
