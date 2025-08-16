import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {
  return (
    <div className="App">
      <h1>Week 3 CRUD App</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
