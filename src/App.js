import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import TaskFormPage from './pages/TaskFormPage';
import TaskDetailsPage from './pages/TaskDetailsPage';

// ...
<Routes>
  {/* other routes */}
  <Route path="/tasks/:id" element={<TaskDetailsPage />} />
</Routes>


function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f9f9fb', borderRadius: '12px', margin: '1rem auto', maxWidth: 700 }}>
        <Link to="/">Home</Link>
        <Link to="/tasks">Task List</Link>
        <Link to="/create">Create Task</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/create" element={<TaskFormPage />} />
        <Route path="/tasks/:id" element={<TaskDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
