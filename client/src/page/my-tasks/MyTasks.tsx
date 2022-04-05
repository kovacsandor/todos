import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useQuery } from 'react-query';
import { NoTasksFound, PageFrame, TaskList } from 'src/component';
import { fetchMyTasks } from 'src/page/my-tasks/fetchMyTasks';
import { QueryKey } from 'src/type/QueryKey';

export function MyTasks(): JSX.Element {
  const queryResult = useQuery(QueryKey.MyTasks, () => fetchMyTasks(0));

  return (
    <PageFrame title='My Tasks'>
      <Stack mb={3} spacing={1}>
        {queryResult.isSuccess && queryResult.data.length && <TaskList tasks={queryResult.data} />}
        {queryResult.isSuccess && !queryResult.data.length && <NoTasksFound />}
        {queryResult.isLoading && (
          <>
            <Divider />
            <LoadingButton loading />
          </>
        )}
      </Stack>
    </PageFrame>
  );
}
