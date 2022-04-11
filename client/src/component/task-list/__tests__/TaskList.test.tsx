import { ListProps } from '@mui/material/List';
import { render, screen, within } from '@testing-library/react';
import { TaskList } from 'src/component/task-list';
import { ITaskListItemProps } from 'src/component/task-list/ITaskListItemProps';
import { ITask } from 'src/type';

jest.mock('@mui/material/List', () => ({ children }: ListProps) => (
  <div>
    List
    <div>{children}</div>
  </div>
));

jest.mock('src/component/task-list/TaskListItem', () => ({
  TaskListItem: ({ curr, prev }: ITaskListItemProps) => (
    <div>
      TaskListItem {curr.id}
      <div>curr is {curr.summary}</div>
      {prev && <div>prev is {prev.summary}</div>}
    </div>
  ),
}));

describe('TaskList', () => {
  const tasks: readonly Omit<ITask, 'createdOn'>[] = [
    {
      dueDate: 123456,
      id: 'id1',
      status: 'todo',
      summary: 'summary1',
      type: 'private',
    },
    {
      dueDate: 123456,
      id: 'id2',
      status: 'todo',
      summary: 'summary2',
      type: 'private',
    },
  ];

  beforeEach(() => {
    render(<TaskList tasks={tasks} />);
  });

  test('page structure is correct', () => {
    const list = screen.getByText(/^list$/i);
    within(list).getByText(/TaskListItem id1/i);
    within(list).getByText(/TaskListItem id2/i);
  });

  test('first task is configured correctly', () => {
    const item = screen.getByText(/TaskListItem id1/i);
    within(item).getByText(/curr is summary1/i);
    expect(within(item).queryByText(/prev is/i)).not.toBeInTheDocument();
  });

  test('second task is configured correctly', () => {
    const item = screen.getByText(/TaskListItem id2/i);
    within(item).getByText(/curr is summary2/i);
    within(item).getByText(/prev is summary1/i);
  });
});
