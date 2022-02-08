import { ListProps } from '@mui/material/List';
import { render, screen, within } from '@testing-library/react';
import { TaskList } from 'src/component/task-list';
import { ITaskProps } from 'src/component/task/ITaskProps';
import { ITask } from 'src/type';

jest.mock('@mui/material/List', () => ({ children }: ListProps) => (
  <div>
    List
    <div>{children}</div>
  </div>
));

jest.mock('src/component', () => ({
  Task: ({ task }: ITaskProps) => (
    <div>
      Task
      <div>summary is {task.summary}</div>
    </div>
  ),
}));

describe('TaskList', () => {
  const tasks: readonly Omit<ITask, 'createdOn'>[] = [
    {
      dueDate: 123456,
      id: 'id',
      status: 'todo',
      summary: 'summary',
      type: 'private',
    },
  ];

  beforeEach(() => {
    render(<TaskList tasks={tasks} />);
  });

  test('page structure is correct', () => {
    const list = screen.getByText(/list/i);
    within(list).getByText(/^task$/i);
  });

  test('task is configured correctly', () => {
    screen.getByText(/summary is summary/i);
  });
});
