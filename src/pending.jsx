import React, { useState, useEffect } from 'react';

function Pending() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="task-list">
      <h1>Pending Tasks</h1>
      <ul>
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-info">
                <span style={{fontWeight:"bold"}}>{task.title}</span>
                <span>Deadline: {task.deadline}</span>
                <span>Priority: {task.priority}</span>
              </div>
              <div className="task-buttons">
              <button className="complete-btn" onClick={() => handleComplete(task.id)}>Complete</button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                <img className='dlt' height='20px' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-3807729-3173196.png?f=webp&w=256" alt="" />
                </button>
          
              </div>
            </li>
          ))
        ) : (
          <p>No pending tasks available</p>
        )}
      </ul>
    </div>
  );
}

export default Pending;
