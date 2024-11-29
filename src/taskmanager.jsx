import React, { useState, useEffect } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    category: '',
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
   
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));

    }
  }, []);


  const handleTaskCreation = (e) => {
    e.preventDefault();
    const task = { ...newTask, id: Date.now(), completed: false };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTask({
      title: '',
      description: '',
      deadline: '',
      priority: '',
      category: '',
    });
  };


  return (
    <div className="task-manager">
      <h1>To-Do-List</h1>
      <form onSubmit={handleTaskCreation}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Deadline"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="">Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
        >
          <option value="">Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskManager;
