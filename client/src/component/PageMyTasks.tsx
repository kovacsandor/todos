import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { ITask } from 'src/component/ITask';
import { Page } from 'src/component/Page';
import { Task } from 'src/component/Task';
import { useTasks } from 'src/component/useTasks';

export function PageMyTasks(): JSX.Element {
  const tasks = useTasks();

  return (
    <Page title='My Tasks'>
      <Stack mb={3} spacing={1}>
        <List>
          {tasks.map((task: Omit<ITask, 'createdOn'>) => (
            <Task key={task.id} task={task} />
          ))}
        </List>
      </Stack>
    </Page>
  );
}
