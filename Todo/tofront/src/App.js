import React, { useState, useEffect } from "react";
import axios from "axios";
import "./todo.css";
import Main from "./Main";

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const API_URL = "https://todo-back-so5v.onrender.com";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/get-tasks`);
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    await axios.post(`${API_URL}/add-task`, { title: task });
    setTask("");
    fetchTasks();
  };

  const completeTask = async (id) => {
    await axios.put(`${API_URL}/complete-task/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/delete-task/${id}`);
    fetchTasks();
  };

  return (
    <div className="todo-wrapper">
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      <div className="todo-card">
        <h1>My Tasks</h1>

        <form onSubmit={addTask} className="task-form">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter new task..."
          />
          <button type="submit">Add</button>
        </form>

        <div className="task-list">
          {tasks.map((t) => (
            <div key={t._id} className="task-item">
              <span className={t.completed ? "done" : ""}>{t.title}</span>

              <div>
                <button onClick={() => completeTask(t._id)}>
                  {t.completed ? "✔" : "Complete"}
                </button>

                <button
                  className="delete"
                  onClick={() => deleteTask(t._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}
