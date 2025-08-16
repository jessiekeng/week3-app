import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  return (
  <div>
    {tasks.length === 0 ? (
      <p>No tasks yet. Add one above!</p>
    ) : (
      tasks.map(task => <TaskItem key={task.id} task={task} />)
    )}
  </div>
);

};

export default TaskList;
