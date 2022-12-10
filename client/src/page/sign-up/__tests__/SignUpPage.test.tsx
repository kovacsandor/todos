import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { SignUpPage } from 'src/page';
import { store } from 'src/redux';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const Page = (
  <MemoryRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SignUpPage />
      </QueryClientProvider>
    </Provider>
  </MemoryRouter>
);

const mockPost = jest.fn();
const mockUseLogin = jest.fn();

jest.mock('src/hook', () => ({
  useLogin: () => (token: string) => mockUseLogin(token),
  useRedirectAuthorized: () => jest.fn(),
}));

jest.mock('axios', () => ({
  post: (url: string) => mockPost(url),
}));

describe('SignUpPage', () => {
  test('user can sign up', async () => {
    mockPost.mockResolvedValue({
      data: {
        payload: {
          token: 'Token',
        },
        type: 'Success',
      },
    });
    render(Page);
    const user = userEvent.setup();
    const name = screen.getByRole('textbox', {
      name: /name/i,
    });
    const email = screen.getByRole('textbox', {
      name: /email/i,
    });
    const password = screen.getByLabelText(/password \*/i);
    const passwordConfirmation = screen.getByLabelText(/password confirmation \*/i);
    await user.type(name, 'John Doe');
    await user.type(email, 'john.doe@email.com');
    await user.type(password, '0123456789012345');
    await user.type(passwordConfirmation, '0123456789012345');

    const submit = screen.getByRole('button', {
      name: /sign up/i,
    });
    await user.click(submit);

    await waitFor(() => expect(mockUseLogin).toBeCalledWith('Token'));
  });
});
