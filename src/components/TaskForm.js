import React, { useState } from 'react';
import { createOrUpdateTask } from '../api';
import './TaskForm.css';


function TaskForm({ onSuccess }) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    owner: '',
    command: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createOrUpdateTask(form);
      setForm({ id: '', name: '', owner: '', command: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data || 'Failed to save task.');
    }
    setLoading(false);
  };

  return (
  <form onSubmit={handleSubmit} aria-label="Create or update task form" className="taskform-container">
    <h2 style={{ textAlign: 'center', color: '#00CB79', marginBottom: '1rem' }}>Create Task</h2>
    <div>
      <label htmlFor="id" className="taskform-label">ID:</label>
      <input id="id" name="id" value={form.id} onChange={handleChange} required className="taskform-input" />
    </div>
    <div>
      <label htmlFor="name" className="taskform-label">Name:</label>
      <input id="name" name="name" value={form.name} onChange={handleChange} required className="taskform-input" />
    </div>
    <div>
      <label htmlFor="owner" className="taskform-label">Owner:</label>
      <input id="owner" name="owner" value={form.owner} onChange={handleChange} required className="taskform-input" />
    </div>
    <div>
      <label htmlFor="command" className="taskform-label">Command:</label>
      <input id="command" name="command" value={form.command} onChange={handleChange} required className="taskform-input" />
    </div>
    <button type="submit" disabled={loading} className="taskform-button">
      {loading ? 'Saving...' : 'Save Task'}
    </button>
    {error && <div role="alert" className="taskform-error">{error}</div>}
  </form>
);

}

export default TaskForm;
