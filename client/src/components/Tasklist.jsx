import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = ({ tasks, onEdit, onDelete, onMove }) => {
  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === 'To Do');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped back in its original position
    if (!destination ||
        (destination.droppableId === source.droppableId &&
         destination.index === source.index)) {
      return;
    }

    // Find the task that was dragged
    const task = tasks.find(t => t._id === draggableId);

    // Determine the new status based on the destination droppable
    let newStatus;
    switch (destination.droppableId) {
      case 'todo':
        newStatus = 'To Do';
        break;
      case 'inProgress':
        newStatus = 'In Progress';
        break;
      case 'done':
        newStatus = 'Done';
        break;
      default:
        return;
    }

    // Update the task status if it changed
    if (task && task.status !== newStatus) {
      onMove(task._id, newStatus);
    }
  };

  // Task card component
  const TaskCard = ({ task, index }) => {
    // Determine border color based on status
    const getBorderColor = () => {
      switch(task.status) {
        case 'To Do':
          return 'var(--warning-color)';
        case 'In Progress':
          return 'var(--primary-color)';
        case 'Done':
          return 'var(--success-color)';
        default:
          return 'var(--primary-color)';
      }
    };

    return (
      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-card"
            style={{
              borderLeftColor: getBorderColor(),
              ...provided.draggableProps.style
            }}
          >
            <div className="task-card-header">
              <h3>{task.title}</h3>
              <span className={`task-status status-${task.status.toLowerCase().replace(' ', '-')}`}>
                {task.status}
              </span>
            </div>

            {task.description && (
              <div className="task-card-description">
                <p>{task.description}</p>
              </div>
            )}

            {task.assignedTo && (
              <div className="task-card-assignee">
                <i className="fas fa-user-circle"></i>
                <span>{task.assignedTo}</span>
              </div>
            )}

            <div className="task-actions">
              <button className="btn btn-primary" onClick={() => onEdit(task)}>
                <i className="fas fa-edit"></i> Edit
              </button>
              <button className="btn btn-danger" onClick={() => onDelete(task._id)}>
                <i className="fas fa-trash-alt"></i> Delete
              </button>
              {task.status !== 'In Progress' && task.status === 'To Do' && (
                <button className="btn btn-warning" onClick={() => onMove(task._id, 'In Progress')}>
                  <i className="fas fa-arrow-right"></i> Move to In Progress
                </button>
              )}
              {task.status !== 'Done' && task.status === 'In Progress' && (
                <button className="btn btn-success" onClick={() => onMove(task._id, 'Done')}>
                  <i className="fas fa-check"></i> Move to Done
                </button>
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  // Column component
  const Column = ({ title, tasks, droppableId }) => {
    // Get column color based on status
    const getColumnColor = () => {
      switch(droppableId) {
        case 'todo':
          return 'var(--warning-color)';
        case 'inProgress':
          return 'var(--primary-color)';
        case 'done':
          return 'var(--success-color)';
        default:
          return 'var(--primary-color)';
      }
    };

    return (
      <div className={`task-column column-${droppableId}`}>
        <div className="column-header" style={{ borderBottomColor: getColumnColor() }}>
          <h2>{title}</h2>
          <span className="task-count">{tasks.length}</span>
        </div>
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="column-content"
            >
              {tasks.length === 0 ? (
                <div className="empty-column">
                  <i className="fas fa-clipboard-list"></i>
                  <p>No tasks yet</p>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <TaskCard key={task._id} task={task} index={index} />
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        <Column title="To Do" tasks={todoTasks} droppableId="todo" />
        <Column title="In Progress" tasks={inProgressTasks} droppableId="inProgress" />
        <Column title="Done" tasks={doneTasks} droppableId="done" />
      </div>
    </DragDropContext>
  );
};

export default TaskList;
