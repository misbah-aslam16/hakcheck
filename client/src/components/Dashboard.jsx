import React from 'react';

const Dashboard = ({ user, tasks }) => {
  const totalTasks = tasks?.length || 0;
  const todoTasks = tasks?.filter(task => task.status === 'To Do').length || 0;
  const inProgressTasks = tasks?.filter(task => task.status === 'In Progress').length || 0;
  const doneTasks = tasks?.filter(task => task.status === 'Done').length || 0;
  const userTasks = tasks?.filter(task => task.assignedTo === user?.name).length || 0;

  const StatCard = ({ title, count, color }) => (
    <div className="stat-card" style={{ backgroundColor: color }}>
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Welcome, {user?.name}!</h2>
      <div className="stat-cards">
        <StatCard title="Total Tasks" count={totalTasks} color="#3498db" />
        <StatCard title="To Do" count={todoTasks} color="#e74c3c" />
        <StatCard title="In Progress" count={inProgressTasks} color="#f39c12" />
        <StatCard title="Completed" count={doneTasks} color="#2ecc71" />
        <StatCard title="My Tasks" count={userTasks} color="#9b59b6" />
      </div>
    </div>
  );
};

export default Dashboard;
