import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useMemo } from 'react';
import { PageFrame, TaskList } from 'src/component';
import { ProtectedResource } from 'src/component/protected-resource';
import { TaskListMessage } from 'src/component/task-list-message';
import { fetchMyTasks } from 'src/page/my-tasks/fetchMyTasks';
import { getNextPageParam } from 'src/page/my-tasks/getNextPageParam';
import { QueryKey } from 'src/type';
import { TaskListItem } from 'todos-shared';

export function MyTasks(): JSX.Element {
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading, isRefetching, isSuccess, refetch } =
    useInfiniteQuery([QueryKey.MyTasks], ({ pageParam }) => fetchMyTasks((pageParam || 0) * pageSize), {
      getNextPageParam: getNextPageParam(pageSize),
    });

  const hasLoadingTasksFailed = useMemo(
    (): boolean => isError && !isFetchingNextPage && !isRefetching,
    [isError, isFetchingNextPage, isRefetching],
  );

  const isLoadingStateVisible = useMemo(
    (): boolean => isLoading || isFetchingNextPage || isRefetching,
    [isFetchingNextPage, isLoading, isRefetching],
  );

  const isLoadMoreButtonVisible = useMemo(
    (): boolean => isSuccess && !!hasNextPage && !isFetchingNextPage,
    [hasNextPage, isFetchingNextPage, isSuccess],
  );

  const isNoMoreTasksVisible = useMemo(
    (): boolean => !isLoadingStateVisible && isSuccess && !!data.pages[0].length && !hasNextPage,
    [hasNextPage, isSuccess, data, isLoadingStateVisible],
  );
  const isNoTasksFoundVisible = useMemo(
    (): boolean => !isLoadingStateVisible && isSuccess && data.pages.length === 1 && !data.pages[0].length,
    [data, isSuccess, isLoadingStateVisible],
  );
  const isTaskListVisible = useMemo((): boolean => !!data?.pages[0].length, [data]);
  const isDividerListVisible = useMemo(
    (): boolean => isTaskListVisible && !isLoadingStateVisible,
    [isTaskListVisible, isLoadingStateVisible],
  );

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
    [fetchNextPage, refetch, data],
  );

  const tasks = useMemo((): readonly TaskListItem[] => data?.pages.flat() || [], [data]);

  return (
    <ProtectedResource>
      <PageFrame title='My Tasks'>
        {isTaskListVisible && <TaskList tasks={tasks} />}
        {isDividerListVisible && <Divider />}
        {isNoTasksFoundVisible && <TaskListMessage text='No tasks found' />}
        {isNoMoreTasksVisible && <TaskListMessage text='No more tasks' />}
        {isLoadingStateVisible && <LoadingButton loading data-testid='loading-state' />}
        {isLoadMoreButtonVisible && <LoadingButton onClick={onLoadMoreClicked}>Load more</LoadingButton>}
        {hasLoadingTasksFailed && (
          <>
            <TaskListMessage error text='Failed to load tasks' />
            <Divider />
            <LoadingButton onClick={onTryAgainClicked}>Try again</LoadingButton>
          </>
        )}
      </PageFrame>
    </ProtectedResource>
  );
}
