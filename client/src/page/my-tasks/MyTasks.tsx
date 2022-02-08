import Stack from '@mui/material/Stack';
import { NoTasksFound, PageFrame, TaskList } from 'src/component';
import { useTasks } from 'src/page/my-tasks/useTasks';

export function MyTasks(): JSX.Element {
  const tasks = useTasks();

  return (
    <PageFrame title='My Tasks'>
      <Stack mb={3} spacing={1}>
        {tasks.length ? <TaskList tasks={tasks} /> : <NoTasksFound />}
      </Stack>
    </PageFrame>
  );
}
