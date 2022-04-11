import { render, screen } from '@testing-library/react';
import { ITaskListDividerProps } from 'src/component/task-list/ITaskListDividerProps';
import { TaskListItem } from 'src/component/task-list/TaskListItem';
import { ITaskProps } from 'src/component/task/ITaskProps';
import { ITask } from 'src/type';

jest.mock('src/component', () => ({
  Task: ({ task }: ITaskProps) => (
    <div>
      Task
      <div>summary is {task.summary}</div>
    </div>
  ),
}));

jest.mock('src/component/task-list/TaskListDivider', () => ({
  TaskListDivider: ({ curr, prev }: ITaskListDividerProps) => (
    <div>
      TaskListDivider
      <div>curr is {curr.summary}</div>
      <div>prev is {prev?.summary}</div>
    </div>
  ),
}));

describe('TaskListItem', () => {
  const curr: Omit<ITask, 'createdOn'> = {
    dueDate: 123456,
    id: 'id2',
    status: 'todo',
    summary: 'summary2',
    type: 'private',
  };

  const prev: Omit<ITask, 'createdOn'> = {
    dueDate: 123456,
    id: 'id1',
    status: 'todo',
    summary: 'summary1',
    type: 'private',
  };

  beforeEach(() => {
    render(<TaskListItem curr={curr} prev={prev} />);
  });

  test('task is visible', () => {
    screen.getByText(/^task$/i);
    screen.getByText(/summary is summary2/i);
  });

  test('task divider is visible', () => {
    screen.getByText(/TaskListDivider/i);
    screen.getByText(/curr is summary2/i);
    screen.getByText(/prev is summary1/i);
  });
});
