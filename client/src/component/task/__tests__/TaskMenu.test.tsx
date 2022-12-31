import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskMenu } from 'src/component/task/TaskMenu';
import { Task } from 'todos-shared';

const mockPut = jest.fn();

jest.mock('axios', () => ({
  put: (url: string) => mockPut(url),
}));

describe('TaskMenu', () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  test('user can complete task', async () => {
    mockPut.mockResolvedValue({
      data: {
        payload: {
          task: 'task',
        },
        type: 'Success',
      },
    });

    const task: Pick<Task, 'id' | 'status'> = {
      id: 'taskId',
      status: 'todo',
    };

    const user = userEvent.setup({
      delay: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TaskMenu task={task} />
      </QueryClientProvider>,
    );

    const moreButton = screen.getByRole('button');
    await user.click(moreButton);

    const completeButton = screen.getByText(/complete/i);
    await user.click(completeButton);

    expect(mockPut).toBeCalledWith('REACT_APP_ORIGIN/api/task-service/complete/taskId');
  });

  test('user cannot complete a completed task', () => {
    const task: Pick<Task, 'id' | 'status'> = {
      id: 'taskId',
      status: 'completed',
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TaskMenu task={task} />
      </QueryClientProvider>,
    );

    const moreButton = screen.queryByRole('button');

    expect(moreButton).toBeNull();
  });
});
