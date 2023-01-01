import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { TaskListMessage } from 'src/component/task-list-message';
import { getNextPageParam } from 'src/component/task-list/getNextPageParam';
import { ITaskListProps } from 'src/component/task-list/ITaskListProps';
import { TaskListItem } from 'src/component/task-list/TaskListItem';
import { TaskListItem as TaskListItemType } from 'todos-shared';

export function TaskList({ queryKey, fetchTasks }: ITaskListProps): JSX.Element {
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading, isRefetching, isSuccess, refetch } =
    useInfiniteQuery([queryKey], ({ pageParam }) => fetchTasks((pageParam || 0) * pageSize), {
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

  const tasks = useMemo((): readonly TaskListItemType[] => data?.pages.flat() || [], [data]);

  return (
    <>
      {isTaskListVisible && (
        <List>
          {tasks.reduce((acc: JSX.Element[], curr: TaskListItemType, i: number): JSX.Element[] => {
            const prev = tasks.find((item: TaskListItemType, j: number) => j === i - 1);
            return [...acc, <TaskListItem curr={curr} key={curr.id} prev={prev} />];
          }, [])}
        </List>
      )}
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
    </>
  );
}
