import List from '@mui/material/List';
import { Task } from 'src/component';
import { ITaskListProps } from 'src/component/task-list/ITaskListProps';
import { ITask } from 'src/type';

export function TaskList({ tasks }: ITaskListProps): JSX.Element {
  return (
    <List>
      {tasks.map((task: Omit<ITask, 'createdOn'>) => (
        <Task key={task.id} task={task} />
      ))}
    </List>
  );
}
