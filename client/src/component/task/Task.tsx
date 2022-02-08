import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import { ITaskProps } from 'src/component/task/ITaskProps';
import { TaskAvatar } from 'src/component/task/TaskAvatar';

export function Task({ task }: ITaskProps): JSX.Element {
  const dueDate = moment(task.dueDate).format('LL');
  return (
    <ListItem disablePadding>
      <TaskAvatar type={task.type} />
      <ListItemText primary={task.summary} secondary={dueDate} />
    </ListItem>
  );
}
