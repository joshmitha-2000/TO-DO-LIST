
import React, { useState, useEffect } from 'react';

function TaskList() {
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
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="task-list">
      <h1>Your Tasks</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-info">
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'blue' : 'green',
                    fontWeight:"bolder",
                  }}
                >
                  {task.title}
                </span>
                <span>Deadline: {task.deadline}</span>
                <span>Priority: {task.priority}</span>
              </div>
              <span className="task-buttons">
              <button style={{backgroundColor:task.completed ?'red':'green'}} className="complete-btn" onClick={() => handleComplete(task.id)}>
              {task.completed ? 'Completed' : 'Complete'}
              
              </button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                  <img className='dlt' height='20px' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-3807729-3173196.png?f=webp&w=256" alt="" />
                </button>
              </span>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
}

export default TaskList;

