import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Sign() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
 


    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:3000/get-tasks');
        setTasks(res.data);
    };

    const addTask = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/add-task', { title: task });
        fetchTasks();
        setTask('');
    };

    const markCompleted = async (id) => {
        await axios.put(`http://localhost:3000/complete-task/${id}`);
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:3000/delete-task/${id}`);
        fetchTasks();
    };
    const togglePending = async (id, currentStatus) => {
        try {
          await axios.put(`http://localhost:5000/tasks/${id}`, {
            completed: currentStatus ? false : true, // Toggle completion status
          });
          fetchTasks(); // Refresh task list after update
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

            <h1 style={{textDecoration:"underline" , marginLeft:"100px", fontSize: "50px"}}>Add Your Today's Task</h1>
            <form onSubmit={addTask}>
                <input 
                    type="text" 
                    placeholder="Add Task" 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
<br></br>
            <h2>Tasks:-</h2>
      <div>
        {tasks.map((task) => (
          <div key={task._id} style={{ marginBottom: '10px' }}>
            <span >
              {task.title}
            </span>
            
            <input
              type="checkbox"
              checked={task.completed} 
              onChange={() => markCompleted(task._id)} // Toggle task completion
            />
         <button onClick={()=>markCompleted(task._id)}>complete</button>


         {/* Pending Button */}
         <button
              onClick={() => togglePending(task._id, task.completed)}
              style={{
                backgroundColor: task.completed ? 'green' : 'red', // Red for pending, Green for completed
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </button>

            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>
        </div>
    );
}

export default Sign;