import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

// Task Management Components
import TaskForm from './components/TaskForm';
import TaskList from './components/Tasklist';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Task Management States
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Load tasks
  const loadTasks = async () => {
    const { data } = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  // Task Handlers
  const handleSave = async (task) => {
    if (currentTask) {
      await updateTask(currentTask._id, task);
    } else {
      task.status = task.status || 'To Do'; // Default status
      await createTask(task);
    }
    setCurrentTask(null);
    loadTasks();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleMove = async (id, newStatus) => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      await updateTask(id, { ...task, status: newStatus });
      loadTasks();
    }
  };

  const handleCancel = () => {
    setCurrentTask(null);
  };

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} user={user} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login login={login} />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login login={login} />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/login" /> : <Register />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <div>
                    <Dashboard user={user} tasks={tasks} />
                    <div className="container">
                      <h1 style={{ textAlign: 'center', margin: '30px 0 20px' }}>Task Board</h1>
                      <TaskForm
                        currentTask={currentTask}
                        onSave={handleSave}
                        onCancel={handleCancel}
                      />

                      <TaskList
                        tasks={tasks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onMove={handleMove}
                      />
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
