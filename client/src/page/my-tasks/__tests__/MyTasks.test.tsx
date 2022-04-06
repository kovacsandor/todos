import { LoadingButtonProps } from '@mui/lab';
import { TypographyProps } from '@mui/material';
import { StackProps } from '@mui/material/Stack';
import { render, screen, within } from '@testing-library/react';
import { useQuery } from 'react-query';
import { IPageProps } from 'src/component/page-frame/IPageProps';
import { ITaskListProps } from 'src/component/task-list/ITaskListProps';
import { MyTasks } from 'src/page';
import { QueryKey } from 'src/type/QueryKey';

const mockTask = { id: 'mockTaskId' };
const mockTasks = [mockTask];
const mockUseQuery = jest.fn();
const mockFetchMyTasks = jest.fn();

type QueryKeyType = Parameters<typeof useQuery>['0'];

jest.mock('@mui/lab/LoadingButton', () => ({ loading }: LoadingButtonProps) => (
  <div>
    LoadingButton
    <div>{loading && 'loading is true'}</div>
  </div>
));

jest.mock('@mui/material/Divider', () => () => <div>Divider</div>);

jest.mock('@mui/material/Stack', () => ({ children, mb, spacing }: StackProps) => (
  <div>
    Stack
    <div>mb is {mb}</div>
    <div>spacing is {spacing}</div>
    <div>{children}</div>
  </div>
));

jest.mock('@mui/material/Typography', () => ({ children, color, variant, textAlign }: TypographyProps) => (
  <div>
    Typography
    <div>color is {color}</div>
    <div>variant is {variant}</div>
    <div>textAlign is {textAlign}</div>
    <div>{children}</div>
  </div>
));

jest.mock('@mui/material/colors', () => ({
  red: {
    700: '700',
  },
}));

jest.mock('react-query', () => ({
  useQuery: (queryKey: QueryKeyType, queryFn: () => void) => {
    queryFn();
    return mockUseQuery(queryKey, queryFn);
  },
}));

jest.mock('src/component', () => ({
  NoTasksFound: () => <div>NoTasksFound</div>,
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

describe('MyTasks', () => {
  describe('endpoint', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValueOnce({
        isSuccess: true,
        data: mockTasks,
      });
      render(<MyTasks />);
    });

    test('configuration is correct', () => {
      expect(mockUseQuery).toBeCalledWith(QueryKey.MyTasks, expect.any(Function));
      expect(mockFetchMyTasks).toBeCalledWith(0);
    });
  });

  describe('layout is correct', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValueOnce({
        isSuccess: true,
        data: mockTasks,
      });
      render(<MyTasks />);
    });

    test('header is configured correctly', () => {
      screen.getByText(/title is my tasks/i);
    });

    test('page structure is correct', () => {
      const page = screen.getByText(/page/i);
      within(page).getByText(/stack/i);
    });

    test('stack is configured correctly', () => {
      screen.getByText(/mb is 3/i);
      screen.getByText(/spacing is 1/i);
    });
  });

  describe('there is at least one task', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValueOnce({
        isSuccess: true,
        data: mockTasks,
      });
      render(<MyTasks />);
    });

    test('page structure is correct', () => {
      const stack = screen.getByText(/stack/i);
      within(stack).getByText(/tasklist/i);
    });

    test('task list is configured correctly', () => {
      screen.getByText(/id is mocktaskid/i);
    });
  });

  describe('there are no tasks', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValueOnce({
        isSuccess: true,
        data: [],
      });
      render(<MyTasks />);
    });

    test('header is configured correctly', () => {
      const stack = screen.getByText(/stack/i);
      within(stack).getByText(/NoTasksFound/i);
    });
  });

  describe('tasks are being fetched', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValueOnce({
        isLoading: true,
      });
      render(<MyTasks />);
    });

    test('progress indicator is visible', () => {
      const stack = screen.getByText(/stack/i);
      const button = within(stack).getByText(/LoadingButton/i);
      within(button).getByText(/loading is true/i);
    });
  });

  describe('failed to load tasks', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValueOnce({
        isError: true,
      });
      render(<MyTasks />);
    });

    test('error message is visible', () => {
      const stack = screen.getByText(/stack/i);
      const typography = within(stack).getByText(/typography/i);
      within(typography).getByText(/Failed to load tasks/i);
      within(typography).getByText(/color is 700/i);
      within(typography).getByText(/variant is overline/i);
      within(typography).getByText(/textalign is center/i);
    });
  });
});
