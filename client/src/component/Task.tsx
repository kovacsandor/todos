import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import { ITask } from 'src/component/ITask';
import { TaskAvatar } from 'src/component/TaskAvatar';

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
