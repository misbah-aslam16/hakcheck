import React, { useState, useEffect } from 'react';

const TaskForm = ({ currentTask, onSave, onCancel }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'To Do'
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask({
      title: '',
      description: '',
      assignedTo: '',
      status: 'To Do'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="task-form-header">
        <h3>{currentTask ? 'Edit Task' : 'Create New Task'}</h3>
        <p>{currentTask ? 'Update the task details below' : 'Fill in the details to create a new task'}</p>
      </div>

      <div className="task-form-body">
        <div className="task-form-group">
          <label htmlFor="title">
            <i className="fas fa-tasks"></i> Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="task-form-group">
          <label htmlFor="description">
            <i className="fas fa-align-left"></i> Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter task description"
            value={task.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="task-form-group">
          <label htmlFor="assignedTo">
            <i className="fas fa-user"></i> Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            placeholder="Enter assignee name"
            value={task.assignedTo}
            onChange={handleChange}
          />
        </div>

        <div className="task-form-group">
          <label htmlFor="status">
            <i className="fas fa-chart-line"></i> Status
          </label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className={`status-${task.status.toLowerCase().replace(' ', '-')}`}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="task-form-actions">
        <button type="submit" className="btn btn-primary">
          <i className={currentTask ? "fas fa-save" : "fas fa-plus"}></i>
          {currentTask ? ' Update Task' : ' Add Task'}
        </button>
        {currentTask && (
          <button type="button" onClick={onCancel} className="btn btn-danger">
            <i className="fas fa-times"></i> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
