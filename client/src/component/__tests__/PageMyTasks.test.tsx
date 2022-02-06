import { ListProps } from '@mui/material/List';
import { StackProps } from '@mui/material/Stack';
import { render, screen, within } from '@testing-library/react';
import { IPageProps } from 'src/component/Page/IPageProps';
import { PageMyTasks } from 'src/component/PageMyTasks';

const mockTask = { id: 'mockTaskId' };
const mockTasks = [mockTask];
const mockUseTasks = jest.fn<typeof mockTasks, []>();

interface ITaskProps {
  readonly task: typeof mockTask;
}

jest.mock('@mui/material/List', () => ({ children }: ListProps) => (
  <div>
    List
    <div>{children}</div>
  </div>
));

jest.mock('@mui/material/Stack', () => ({ children, mb, spacing }: StackProps) => (
  <div>
    Stack
    <div>mb is {mb}</div>
    <div>spacing is {spacing}</div>
    <div>{children}</div>
  </div>
));

jest.mock('src/component/Page', () => ({
  Page: ({ children, title }: IPageProps) => (
    <div>
      Page
      <div>title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

jest.mock('src/component/Task', () => ({
  Task: ({ task }: ITaskProps) => (
    <div>
      Task
      <div>id is {task.id}</div>
    </div>
  ),
}));

jest.mock('src/component/useTasks', () => ({ useTasks: () => mockUseTasks() }));

describe('PageMyTasks', () => {
  beforeEach(() => {
    mockUseTasks.mockReturnValueOnce(mockTasks);
    render(<PageMyTasks />);
  });

  test('header is configured correctly', () => {
    screen.getByText(/title is my tasks/i);
  });

  test('page structure is correct', () => {
    const page = screen.getByText(/page/i);
    const stack = within(page).getByText(/stack/i);
    const list = within(stack).getByText(/list/i);
    within(list).getByText(/^task$/i);
  });

  test('stack is configured correctly', () => {
    screen.getByText(/mb is 3/i);
    screen.getByText(/spacing is 1/i);
  });

  test('task is configured correctly', () => {
    screen.getByText(/id is mocktaskid/i);
  });
});
