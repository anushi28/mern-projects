import React, { useState, useEffect } from "react";
import axios from "axios";
import "./todo.css"; // keep if you already have styling
import Main from "./Main";

const API_URL = "https://todo-back-so5v.onrender.com";


function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    try {
      await axios.post(`${API_URL}/add-task`, { title: task });
      setTask("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(`${API_URL}/complete-task/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete-task/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="todo">
    <button
  onClick={() => window.location.href = "/"}
  style={{
    marginBottom: "20px",
    padding: "8px 16px",
    cursor: "pointer"
  }}
>
  ⬅ Back
</button>
      <h1>Add Your Today’s Task</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <h2>Tasks</h2>

      {tasks.length === 0 && <p>No tasks yet</p>}

      {tasks.map((t) => (
        <div key={t._id} style={{ marginBottom: "10px" }}>
          <span
            style={{
              textDecoration: t.completed ? "line-through" : "none",
              marginRight: "10px",
            }}
          >
            {t.title}
          </span>

          <button onClick={() => markCompleted(t._id)}>
            {t.completed ? "Completed" : "Complete"}
          </button>

          <button
            onClick={() => deleteTask(t._id)}
            style={{ marginLeft: "5px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
