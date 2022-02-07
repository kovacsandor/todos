import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import { TaskAvatar } from 'src/component/task/TaskAvatar';
import { ITask } from 'src/type';

interface IProps {
  readonly task: Omit<ITask, 'createdOn' | 'id' | 'status'>;
}

export function Task({ task }: IProps): JSX.Element {
  const dueDate = moment(task.dueDate).format('LL');
  return (
    <ListItem disablePadding>
      <TaskAvatar type={task.type} />
      <ListItemText primary={task.summary} secondary={dueDate} />
    </ListItem>
  );
}
