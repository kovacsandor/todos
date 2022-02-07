import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { PageFrame, Task } from 'src/component';
import { useTasks } from 'src/page/my-tasks/useTasks';
import { ITask } from 'src/type';

export function MyTasks(): JSX.Element {
  const tasks = useTasks();

  return (
    <PageFrame title='My Tasks'>
      <Stack mb={3} spacing={1}>
        <List>
          {tasks.map((task: Omit<ITask, 'createdOn'>) => (
            <Task key={task.id} task={task} />
          ))}
        </List>
      </Stack>
    </PageFrame>
  );
}
