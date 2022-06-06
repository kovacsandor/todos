import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import React, { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { PageFrame, TaskList } from 'src/component';
import { TaskListMessage } from 'src/component/task-list-message';
import { fetchMyTasks } from 'src/page/my-tasks/fetchMyTasks';
import { getNextPageParam } from 'src/page/my-tasks/getNextPageParam';
import { ITask } from 'src/type';
import { QueryKey } from 'src/type/QueryKey';

export function MyTasks(): JSX.Element {
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading, isRefetching, isSuccess, refetch } =
    useInfiniteQuery(QueryKey.MyTasks, ({ pageParam }) => fetchMyTasks(pageParam || 0 * pageSize), {
      getNextPageParam: getNextPageParam(pageSize),
    });

  const hasLoadingTasksFailed = useMemo(
    (): boolean => isError && !isFetchingNextPage && !isRefetching,
    [isError, isFetchingNextPage, isRefetching],
  );

  const isLoadingStateVisible = useMemo(
    (): boolean => isLoading || isFetchingNextPage,
    [isFetchingNextPage, isLoading],
  );

  const isLoadMoreButtonVisible = useMemo(
    (): boolean => isSuccess && !!hasNextPage && !isFetchingNextPage,
    [hasNextPage, isFetchingNextPage, isSuccess],
  );

  const isNoMoreTasksVisible = useMemo((): boolean => isSuccess && !hasNextPage, [hasNextPage, isSuccess]);
  const isNoTasksFoundVisible = useMemo((): boolean => isSuccess && !data?.pages.length, [data, isSuccess]);
  const isTaskListVisible = useMemo((): boolean => !!data?.pages.length, [data]);

  const onLoadMoreClicked = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      fetchNextPage();
    },
    [fetchNextPage],
  );

  const onTryAgainClicked = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      if (data) {
        fetchNextPage();
        return;
      }

      refetch();
    },
    [fetchNextPage, refetch],
  );

  const tasks = useMemo((): Omit<ITask, 'createdOn'>[] => data?.pages.flat() || [], [data]);

  return (
    <PageFrame title='My Tasks'>
      <Stack mb={3} spacing={1}>
        {isTaskListVisible && <TaskList tasks={tasks} />}
        {isNoTasksFoundVisible && <TaskListMessage text='No tasks found' />}
        <Divider />
        {isNoMoreTasksVisible && <TaskListMessage text='No more tasks' />}
        {isLoadingStateVisible && <LoadingButton loading />}
        {isLoadMoreButtonVisible && <LoadingButton onClick={onLoadMoreClicked}>Load more</LoadingButton>}
        {hasLoadingTasksFailed && (
          <>
            <TaskListMessage error text='Failed to load tasks' />
            <Divider />
            <LoadingButton onClick={onTryAgainClicked}>Try again</LoadingButton>
          </>
        )}
      </Stack>
    </PageFrame>
  );
}
