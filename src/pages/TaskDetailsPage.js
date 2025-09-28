import { useParams } from 'react-router-dom';
import TaskDetails from '../components/TaskDetails';

function TaskDetailsPage() {
  const { id } = useParams();
  return <TaskDetails taskId={id} />;
}

export default TaskDetailsPage;
