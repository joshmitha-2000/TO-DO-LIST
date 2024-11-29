import React from 'react';
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';
import TaskManager from './taskmanager.jsx';
import TaskList from './task list.jsx'; // Component where tasks are shown
import Completed from './completed.jsx';
import Pending from './pending.jsx';
import Notification from './Notify.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/Ctasks">Completed</Link>
            </li>
            <li>
              <Link to="/Ptasks">Pending</Link>
            </li>
            <li>
              <Link to="/Ntasks"><img height="25px" src="https://www.pngkey.com/png/full/444-4444265_topic-push-notification-icon-icone-notification.png" alt="img" /></Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<TaskManager />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/Ctasks" element={<Completed />} />
          <Route path="/Ptasks" element={<Pending />} />
          <Route path="/Ntasks" element={<Notification/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
