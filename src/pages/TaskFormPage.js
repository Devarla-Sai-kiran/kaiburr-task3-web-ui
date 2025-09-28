import './TaskFormPage.css';
import TaskForm from '../components/TaskForm';

function TaskFormPage() {
  return (
    <div className="taskformpage-container">
      <h2 className="taskformpage-title">Create a New Task</h2>
      <TaskForm />
    </div>
  );
}

export default TaskFormPage;
