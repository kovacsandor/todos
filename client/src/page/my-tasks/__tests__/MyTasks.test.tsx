import { LoadingButtonProps } from '@mui/lab';
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { IPageProps } from 'src/component/page-frame/IPageProps';
import { IProtectedResourceProps } from 'src/component/protected-resource/IProtectedResourceProps';
import { ITaskListMessageProps } from 'src/component/task-list-message/ITaskListMessageProps';
import { ITaskListProps } from 'src/component/task-list/ITaskListProps';
import { MyTasks } from 'src/page';
import { QueryKey } from 'src/type';

const mockGetNextPageParam = jest.fn();
const mockFetchMyTasks = jest.fn();
const mockFetchNextPage = jest.fn();
const mockRefetch = jest.fn();
const mockTask = { id: 'mockTaskId' };
const mockTasks = [mockTask];
const mockUseInfiniteQuery = jest.fn();

type QueryKeyType = Parameters<typeof useInfiniteQuery>['0'];

jest.mock('@mui/lab/LoadingButton', () => ({ children, loading, onClick }: LoadingButtonProps) => (
  <div>
    LoadingButton
    <div>{loading && 'loading is true'}</div>
    <button onClick={onClick}>{children}</button>
  </div>
));

jest.mock('@mui/material/Divider', () => () => <div>Divider</div>);

jest.mock('src/component/task-list-message', () => ({
  TaskListMessage: ({ error, text }: ITaskListMessageProps) => (
    <div>
      TaskListMessage
      {error && <div>error </div>}
      <div>text is {text}</div>
    </div>
  ),
}));

jest.mock('src/component/protected-resource', () => ({
  ProtectedResource: ({ children }: IProtectedResourceProps) => (
    <div>
      ProtectedResource
      <div>{children}</div>
    </div>
  ),
}));

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: (
    queryKey: QueryKeyType,
    queryFn: (context: { readonly pageParam: number }) => void,
    options: UseInfiniteQueryOptions,
  ) => {
    queryFn({ pageParam: 0 });
    return mockUseInfiniteQuery(queryKey, queryFn, options);
  },
}));

jest.mock('src/component', () => ({
  PageFrame: ({ children, title }: IPageProps) => (
    <div>
      Page
      <div>title is {title}</div>
      <div>{children}</div>
    </div>
  ),
  TaskList: ({ tasks: [task] }: ITaskListProps) => (
    <div>
      TaskList
      <div>id is {task.id}</div>
    </div>
  ),
}));

jest.mock('src/page/my-tasks/fetchMyTasks', () => ({ fetchMyTasks: (from: number) => mockFetchMyTasks(from) }));

jest.mock('src/page/my-tasks/getNextPageParam', () => ({
  getNextPageParam: (pageSize: number) => {
    mockGetNextPageParam(pageSize);
    return jest.fn();
  },
}));

const hasLoadingTasksFailed = {
  fetchNextPage: mockFetchNextPage,
  isError: true,
  isFetchingNextPage: false,
  isRefetching: false,
  refetch: mockRefetch,
};

const hasLoadingTasksFailedWhenFetchingNextPage = {
  data: { pages: [] },
  fetchNextPage: mockFetchNextPage,
  isError: true,
  isFetchingNextPage: false,
  isRefetching: false,
  refetch: mockRefetch,
};

const isLoadingStateVisibleLoading = {
  isLoading: true,
};

const isLoadingStateVisibleFetchingNext = {
  isFetchingNextPage: true,
};

const isLoadMoreButtonVisible = {
  fetchNextPage: mockFetchNextPage,
  isSuccess: true,
  hasNextPage: true,
  isFetchingNextPage: false,
};

const isNoMoreTasksVisible = {
  isSuccess: true,
  hasNextPage: false,
};

const isNoTasksFoundVisible = {
  isSuccess: true,
  data: { pages: [] },
};

const isTaskListVisible = {
  data: { pages: [mockTasks] },
};

describe('MyTasks', () => {
  describe('endpoint', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(isTaskListVisible);
      render(<MyTasks />);
    });

    test('configuration is correct', () => {
      expect(mockUseInfiniteQuery).toBeCalledWith([QueryKey.MyTasks], expect.any(Function), {
        getNextPageParam: expect.any(Function),
      });
      expect(mockGetNextPageParam).toBeCalledWith(10);
      expect(mockFetchMyTasks).toBeCalledWith(0);
    });
  });

  describe('layout is correct', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(isTaskListVisible);
      render(<MyTasks />);
    });

    test('header is configured correctly', () => {
      screen.getByText(/title is my tasks/i);
    });
  });

  describe('there is at least one task', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(isTaskListVisible);
      render(<MyTasks />);
    });

    test('page structure is correct', () => {
      screen.getByText(/tasklist/i);
    });

    test('task list is configured correctly', () => {
      screen.getByText(/id is mocktaskid/i);
    });
  });

  describe('there are no tasks', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(isNoTasksFoundVisible);
      render(<MyTasks />);
    });

    test('header is configured correctly', () => {
      screen.getByText(/No tasks found/i);
    });
  });

  describe('tasks are being fetched', () => {
    test('progress indicator is visible when loading', () => {
      mockUseInfiniteQuery.mockReturnValueOnce(isLoadingStateVisibleLoading);
      render(<MyTasks />);
      const button = screen.getByText(/LoadingButton/i);
      within(button).getByText(/loading is true/i);
    });

    test('progress indicator is visible when fetching next page', () => {
      mockUseInfiniteQuery.mockReturnValueOnce(isLoadingStateVisibleFetchingNext);
      render(<MyTasks />);
      const button = screen.getByText(/LoadingButton/i);
      within(button).getByText(/loading is true/i);
    });
  });

  describe('failed to load tasks', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(hasLoadingTasksFailed);
      render(<MyTasks />);
    });

    test('error message is visible', () => {
      const taskListMessage = screen.getByText(/TaskListMessage/i);
      within(taskListMessage).getByText(/Failed to load tasks/i);
      within(taskListMessage).getByText(/error/i);
    });
  });

  describe('user can refetch', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(hasLoadingTasksFailed);
      render(<MyTasks />);
    });

    test('try again button is visible and calls refetch', () => {
      const button = screen.getByText(/try again/i);
      fireEvent.click(button);
      expect(mockRefetch).toBeCalled();
    });
  });

  describe('user can refetch next page', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(hasLoadingTasksFailedWhenFetchingNextPage);
      render(<MyTasks />);
    });

    test('try again button is visible and calls fetchNextPage', () => {
      const button = screen.getByText(/try again/i);
      fireEvent.click(button);
      expect(mockFetchNextPage).toBeCalled();
    });
  });

  describe('user can load more tasks', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(isLoadMoreButtonVisible);
      render(<MyTasks />);
    });

    test('load more button is visible and calls fetchNextPage', () => {
      const button = screen.getByText(/load more/i);
      fireEvent.click(button);
      expect(mockFetchNextPage).toBeCalled();
    });
  });

  describe('user can load no more tasks', () => {
    beforeEach(() => {
      mockUseInfiniteQuery.mockReturnValueOnce(isNoMoreTasksVisible);
      render(<MyTasks />);
    });

    test('no more tasks is visible', () => {
      screen.getByText(/no more tasks/i);
    });
  });
});
