import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoggedInUser } from 'src/component/page-frame/LoggedInUser';
import { storeOptionReducer } from 'src/redux/storeOptionReducer';

const mockUseLogout = jest.fn();
const mockGet = jest.fn();
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const store = configureStore({
  preloadedState: { authorization: 'Token' },
  reducer: storeOptionReducer,
});

jest.mock('axios', () => ({
  get: () => mockGet(),
}));

jest.mock('src/hook', () => ({
  useLogout: () => () => mockUseLogout(),
}));

describe('LoggedInUser', () => {
  test('user can see a loading indicator', () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LoggedInUser />
        </QueryClientProvider>
      </Provider>,
    );
    screen.getByRole('progressbar');
  });

  test('user can see an error message', async () => {
    mockGet.mockRejectedValue({
      message: 'Request failed with status code 400',
      response: {
        data: {
          message: 'Error message',
          type: 'HttpError',
        },
      },
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LoggedInUser />
        </QueryClientProvider>
      </Provider>,
    );

    await waitFor(() => screen.findByText(/request failed with status code 400/i));
  });

  test('user can see logged in user name', async () => {
    mockGet.mockResolvedValue({ data: { payload: { loggedInUser: { name: 'John Doe' } }, type: 'Success' } });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LoggedInUser />
        </QueryClientProvider>
      </Provider>,
    );

    await waitFor(() => screen.findByText(/john doe/i));
  });
});
