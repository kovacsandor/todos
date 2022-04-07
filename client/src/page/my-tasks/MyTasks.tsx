import LoadingButton from '@mui/lab/LoadingButton';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { NoTasksFound, PageFrame, TaskList } from 'src/component';
import { fetchMyTasks } from 'src/page/my-tasks/fetchMyTasks';
import { QueryKey } from 'src/type/QueryKey';

export function MyTasks(): JSX.Element {
  const queryResult = useQuery(QueryKey.MyTasks, () => fetchMyTasks(0));

  const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    queryResult.refetch();
  }, []);

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
        {queryResult.isError && (
          <>
            <Divider />
            <Typography color={red[700]} variant='overline' textAlign={'center'}>
              Failed to load tasks
            </Typography>
            <Divider />
            <LoadingButton onClick={onClick}>Try again</LoadingButton>
          </>
        )}
      </Stack>
    </PageFrame>
  );
}
