import React, { useState, useEffect } from 'react';

function Completed() {
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

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="task-list">
      <h1>Completed Tasks</h1>
      <ul>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-info">
                <span style={{fontWeight:"bold"}}>{task.title}</span>
                <span>Deadline: {task.deadline}</span>
                <span>Priority: {task.priority}</span>
              </div>
              <div className="task-buttons">
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                <img className='dlt' height='20px' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-3807729-3173196.png?f=webp&w=256" alt="" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No completed tasks available</p>
        )}
      </ul>
    </div>
  );
}

export default Completed;
