import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { CompletedTasks } from 'src/page/completed-tasks/CompletedTasks';
import { storeOptionReducer } from 'src/redux/storeOptionReducer';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
const store = configureStore({
  preloadedState: {
    authorization: 'Token',
    loggedInUser: {
      name: 'John Doe',
    },
  },
  reducer: storeOptionReducer,
});
const Page = (
  <MemoryRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CompletedTasks />
      </QueryClientProvider>
    </Provider>
  </MemoryRouter>
);

const mockGet = jest.fn();

jest.mock('axios', () => ({
  get: (url: string) => mockGet(url),
}));

describe('CompletedTasks', () => {
  test('user can see loading state on opening the page', async () => {
    mockGet.mockResolvedValue({ data: { payload: { tasks: [] }, type: 'Success' } });
    render(Page);

    screen.getByTestId('loading-state');
  });

  test('user can see if there are no tasks', async () => {
    mockGet.mockResolvedValue({ data: { payload: { tasks: [] }, type: 'Success' } });
    render(Page);
    await waitFor(() => screen.findByText(/no tasks found/i));
  });

  test('user can see the tasks', async () => {
    mockGet.mockResolvedValue({
      data: {
        payload: {
          tasks: [
            {
              status: 'completed',
              summary: 'Summary of the task',
              dueDate: new Date().getTime(),
              id: '0123456789',
              type: 'private',
            },
          ],
        },
        type: 'Success',
      },
    });

    render(Page);
    await waitFor(() => screen.findByText(/summary of the task/i));
  });
});
