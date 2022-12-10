import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MyTasks } from 'src/page';
import { storeOptionReducer } from 'src/redux/storeOptionReducer';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
const store = configureStore({
  preloadedState: { authorization: 'Token' },
  reducer: storeOptionReducer,
});
const Page = (
  <MemoryRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MyTasks />
      </QueryClientProvider>
    </Provider>
  </MemoryRouter>
);

const resolveValue = (response: any) => async (url: string) => {
  return new Promise((resolve) => {
    if (url === 'REACT_APP_BACKEND_API_URL/api/logged-in-user') {
      resolve({ data: { payload: { loggedInUser: { name: 'John Doe' } }, type: 'Success' } });
    }
    if (url === 'REACT_APP_BACKEND_API_URL/api/todos/my-tasks/0') {
      resolve(response);
    }
  });
};

const mockGet = jest.fn();

jest.mock('axios', () => ({
  get: (url: string) => mockGet(url),
}));

describe('MyTasks', () => {
  test('user can see loading state on opening the page', async () => {
    mockGet.mockImplementation(resolveValue({ data: { payload: { tasks: [] }, type: 'Success' } }));
    render(Page);

    screen.getByTestId('loading-state');
  });

  test('user can see if there are no tasks', async () => {
    mockGet.mockImplementation(resolveValue({ data: { payload: { tasks: [] }, type: 'Success' } }));
    render(Page);
    await waitFor(() => screen.findByText(/no tasks found/i));
  });

  test('user can see the tasks', async () => {
    mockGet.mockImplementation(
      resolveValue({
        data: {
          payload: {
            tasks: [
              {
                status: 'todo',
                summary: 'Summary of the task',
                dueDate: new Date().getMilliseconds(),
                id: '0123456789',
                type: 'private',
              },
            ],
          },
          type: 'Success',
        },
      }),
    );

    render(Page);
    await waitFor(() => screen.findByText(/summary of the task/i));
  });
});
