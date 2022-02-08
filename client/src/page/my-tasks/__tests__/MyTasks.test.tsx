import { StackProps } from '@mui/material/Stack';
import { render, screen, within } from '@testing-library/react';
import { IPageProps } from 'src/component/page-frame/IPageProps';
import { ITaskListProps } from 'src/component/task-list/ITaskListProps';
import { MyTasks } from 'src/page';

const mockTask = { id: 'mockTaskId' };
const mockTasks = [mockTask];
const mockUseTasks = jest.fn<typeof mockTasks, []>();

jest.mock('@mui/material/Stack', () => ({ children, mb, spacing }: StackProps) => (
  <div>
    Stack
    <div>mb is {mb}</div>
    <div>spacing is {spacing}</div>
    <div>{children}</div>
  </div>
));

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

jest.mock('src/page/my-tasks/useTasks', () => ({ useTasks: () => mockUseTasks() }));

describe('MyTasks', () => {
  describe('layout is correct', () => {
    beforeEach(() => {
      mockUseTasks.mockReturnValueOnce(mockTasks);
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
      mockUseTasks.mockReturnValueOnce(mockTasks);
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
      mockUseTasks.mockReturnValueOnce([]);
      render(<MyTasks />);
    });

    test('header is configured correctly', () => {
      const stack = screen.getByText(/stack/i);
      within(stack).getByText(/NoTasksFound/i);
    });
  });
});
