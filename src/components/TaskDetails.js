import React, { useEffect, useState } from 'react';
import { getTaskById, executeTask } from '../api';
import './TaskDetails.css';

function TaskDetails({ taskId, onRefresh }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    if (!taskId) return;
    setLoading(true);
    setError('');
    getTaskById(taskId)
      .then(res => setTask(res.data))
      .catch(() => setError('Failed to load task details.'))
      .finally(() => setLoading(false));
  }, [taskId, onRefresh]);

  const handleExecute = async () => {
    setExecuting(true);
    try {
      await executeTask(taskId);
      if (onRefresh) onRefresh();
      // Re-fetch task details to show new execution
      const res = await getTaskById(taskId);
      setTask(res.data);
    } catch {
      setError('Failed to execute task.');
    }
    setExecuting(false);
  };

  if (!taskId) return <div className="taskdetails-container">Select a task to view details.</div>;
  if (loading) return <div className="taskdetails-container">Loading...</div>;
  if (error) return <div className="taskdetails-container" role="alert">{error}</div>;

  return (
    <div className="taskdetails-container">
      <h2 className="taskdetails-title">Task Details</h2>
      <div className="taskdetails-info">
        <div><strong>Name:</strong> {task.name}</div>
        <div><strong>Owner:</strong> {task.owner}</div>
        <div><strong>Command:</strong> <code>{task.command}</code></div>
      </div>
      <button className="taskdetails-btn" onClick={handleExecute} disabled={executing}>
        {executing ? 'Running...' : 'Run Command Again'}
      </button>
      <h3 className="taskdetails-subtitle">Executions</h3>
      {task.taskExecutions && task.taskExecutions.length > 0 ? (
        <ul className="taskdetails-executions">
          {task.taskExecutions.map((exec, idx) => (
            <li key={idx} className="taskdetails-execution-item">
              <div><strong>Start:</strong> {new Date(exec.startTime).toLocaleString()}</div>
              <div><strong>End:</strong> {new Date(exec.endTime).toLocaleString()}</div>
              <div><strong>Output:</strong>
                <pre className="taskdetails-output">{exec.output}</pre>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No executions yet.</div>
      )}
    </div>
  );
}

export default TaskDetails;
