import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { ITaskProps } from 'src/component/task/ITaskProps';
import { TaskAvatar } from 'src/component/task/TaskAvatar';
import { TaskMenu } from 'src/component/task/TaskMenu';
import { QueryKey } from 'src/type';

export function Task({ task }: ITaskProps): JSX.Element {
  const queryClient = useQueryClient();
  const dueDate = moment(task.dueDate).format('LL');
  const disabled = queryClient.getQueryState([QueryKey.MyTasks])?.fetchStatus === 'fetching';

  return (
    <ListItem
      disabled={disabled}
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
