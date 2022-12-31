import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import { ITaskProps } from 'src/component/task/ITaskProps';
import { TaskAvatar } from 'src/component/task/TaskAvatar';
import { TaskMenu } from 'src/component/task/TaskMenu';

export function Task({ task }: ITaskProps): JSX.Element {
  const dueDate = moment(task.dueDate).format('LL');
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <TaskMenu
          task={{
            id: task.id,
            status: task.status,
          }}
        />
      }
    >
      <TaskAvatar type={task.type} />
      <ListItemText primary={task.summary} secondary={dueDate} />
    </ListItem>
  );
}
