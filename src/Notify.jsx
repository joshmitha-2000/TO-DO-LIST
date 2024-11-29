import React, { useEffect, useState } from 'react';

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      setNotifications(getUpcomingDeadlines(tasks));
    }
  }, []);

  // Function to calculate days remaining until the deadline
  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate - today;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };//rounding up to the nearest full day.

  // Function to get tasks with upcoming deadlines
  const getUpcomingDeadlines = (tasks) => {
    return tasks.map((task) => {
        const daysRemaining = calculateDaysRemaining(task.deadline);
        if (daysRemaining === 1) {
          return { 
            message: (
              <span>
                ⚠️ <span style={{ color: 'red',fontWeight:"bold" }}>"{task.title}"</span> Task is due tomorrow!
              </span>
            ), 
            type: 'warning' 
          };
        } else if (daysRemaining < 0) {
          return { 
            message: (
              <span>
                ⚠️ <span style={{ color: 'red' }}>"{task.title}"</span> Task is overdue!
              </span>
            ), 
            type: 'overdue' 
          };
        } else {
          return null;
        }
      })
      .filter(notification => notification !== null); // Remove null entries
  };

  return (
    <div className='main'>
      <div className='notify'>
      <h2>Notifications</h2>
      <div>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className={notification.type}>
              {notification.message}
            </li>
          ))
        ) : (
          <p>No upcoming deadlines</p>
        )}
      </div>
    </div>
    </div>
    
  );
}

export default Notification;

















// import React, { useEffect, useState } from 'react';

// function Notification() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const storedTasks = localStorage.getItem('tasks');
//     if (storedTasks) {
//       setTasks(JSON.parse(storedTasks));
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}> {/* Make sure to replace 'id' with the correct unique identifier */}
//             {task.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Notification;
