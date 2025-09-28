import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, executeTask } from '../api';
import './TaskList.css';
import { Link } from 'react-router-dom';


function TaskList({ onSelectTask, onRefresh, searchTerm = '' }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [executingId, setExecutingId] = useState(null);
  

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks.');
    }
    setLoading(false);
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
  }, [onRefresh]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      fetchTasks();
    }
  };

  const handleExecute = async (id) => {
    setExecutingId(id);
    try {
      await executeTask(id);
      fetchTasks();
    } catch (err) {
      alert('Failed to execute task.');
    }
    setExecutingId(null);
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div role="alert">{error}</div>;


  return (
    <div className="tasklist-container">
      <h2 className="tasklist-title">All Tasks</h2>
      {error && <div role="alert" className="tasklist-error">{error}</div>}
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <ul className="tasklist-list" aria-label="Task list">
          {filteredTasks.map(task => (
            <li key={task.id} className="tasklist-item">
              <span className="tasklist-item-title">{task.name}</span>
              <span className="tasklist-item-owner">Owner: {task.owner}</span>
              <div className="tasklist-actions">
                <Link
                  to={`/tasks/${task.id}`}
                  className="tasklist-btn tasklist-btn-view"
                  aria-label={`View details for ${task.name}`}
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="tasklist-btn tasklist-btn-delete"
                  aria-label={`Delete ${task.name}`}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleExecute(task.id)}
                  disabled={executingId === task.id}
                  className="tasklist-btn tasklist-btn-run"
                  aria-label={`Run command for ${task.name}`}
                >
                  {executingId === task.id ? 'Running...' : 'Run'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
