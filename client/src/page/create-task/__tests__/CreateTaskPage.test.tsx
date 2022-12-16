import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { CreateTaskPage } from 'src/page';
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
        <CreateTaskPage />
      </QueryClientProvider>
    </Provider>
  </MemoryRouter>
);

const mockPost = jest.fn();

jest.mock('axios', () => ({
  post: (url: string, payload: any) => mockPost(url, payload),
}));

describe('CreateTaskPage', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022 12 10 12:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('user can create', async () => {
    mockPost.mockResolvedValue({
      data: {
        payload: {
          task: 'task',
        },
        type: 'Success',
      },
    });

    render(Page);

    const user = userEvent.setup({
      delay: null,
    });

    const summary = screen.getByRole('textbox', {
      name: /summary/i,
    });
    const type = screen.getByRole('button', {
      name: /type/i,
    });
    const description = screen.getByRole('textbox', {
      name: /description/i,
    });
    const dueDate = screen.getByRole('button', {
      name: /choose date, selected date is/i,
    });

    await user.type(summary, 'Organize the meeting');

    await user.click(type);
    const workOption = await screen.findByText(/work/i);
    await user.click(workOption);

    await user.type(description, 'Do not forget to invite John Doe');
    await user.click(dueDate);

    const dateOption = await screen.findByRole('gridcell', {
      name: /15/i,
    });

    await user.click(dateOption);

    const submit = screen.getByRole('button', {
      name: /create task/i,
    });

    await user.click(submit);

    expect(mockPost).toBeCalledWith('REACT_APP_BACKEND_API_URL/api/task', {
      description: 'Do not forget to invite John Doe',
      dueDate: 1671145199000,
      summary: 'Organize the meeting',
      type: 'work',
    });
  });
});
