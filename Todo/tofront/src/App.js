import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sign() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const API_URL = "https://todo-back-so5v.onrender.com";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/get-tasks`);
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/add-task`, { title: task });
    fetchTasks();
    setTask('');
  };

  const markCompleted = async (id) => {
    await axios.put(`${API_URL}/complete-task/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/delete-task/${id}`);
    fetchTasks();
  };

  const togglePending = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, {
        completed: currentStatus ? false : true,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className='todo'>
      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        ⬅ Back
      </button>

      <h1 style={{ textDecoration: "underline", marginLeft: "100px", fontSize: "50px" }}>
        Add Your Today's Task
      </h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <br />

      <h2>Tasks:-</h2>

      <div>
        {tasks.map((task) => (
          <div key={task._id} style={{ marginBottom: '10px' }}>
            <span>{task.title}</span>

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => markCompleted(task._id)}
            />

            <button onClick={() => markCompleted(task._id)}>Complete</button>

            <button
              onClick={() => togglePending(task._id, task.completed)}
              style={{
                backgroundColor: task.completed ? 'green' : 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
                marginLeft: '5px'
              }}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </button>

            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '5px' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sign;
