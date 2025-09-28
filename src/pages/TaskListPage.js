import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskDetails from '../components/TaskDetails';
import SearchBar from '../components/SearchBar';
import './TaskListPage.css';

function TaskListPage() {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectTask = (id) => setSelectedTaskId(id);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="tasklistpage-container">
      <h2 className="tasklistpage-title">Task List</h2>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <TaskList
        onSelectTask={handleSelectTask}
        onRefresh={refresh}
        searchTerm={searchTerm}
      />
      {selectedTaskId && (
        <TaskDetails taskId={selectedTaskId} onRefresh={handleRefresh} />
      )}
    </div>
  );
}

export default TaskListPage;
