import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from 'src/page/login/LoginPage';

const mockNavigate = jest.fn();
const mockPost = jest.fn();
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

jest.mock('axios', () => ({
  post: () => mockPost(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('src/redux', () => ({
  selectAuthorization: () => jest.fn(),
  setToken: () => jest.fn(),
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => jest.fn(),
}));

describe('LoginPage', () => {
  beforeEach(() => {});

  test('email and password fields are visible', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    screen.getByRole('textbox', {
      name: /email/i,
    });
    screen.getByLabelText(/password/i);
  });

  test('there are no validation messages initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    expect(screen.queryByText(/email is a required field/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email must be a valid email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password must be at least 16 characters/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is a required field/i)).not.toBeInTheDocument();
  });

  test('enabled login button is visible and enabled initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    const button = screen.getByRole('button', {
      name: /login/i,
    });

    expect(button).toBeEnabled();
  });

  test('form cannot be submitted with empty inputs', async () => {
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    const button = screen.getByRole('button', {
      name: /login/i,
    });

    user.click(button);

    await waitFor(() => screen.findByText(/email is a required field/i));
    await waitFor(() => screen.findByText(/password is a required field/i));
    await waitFor(() => expect(button).toBeDisabled());
  });

  test('form fields get validated', async () => {
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    const email = screen.getByRole('textbox', {
      name: /email/i,
    });
    const password = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', {
      name: /login/i,
    });

    await user.click(email);
    await user.click(password);

    await waitFor(() => screen.findByText(/email is a required field/i));
    await waitFor(() => expect(screen.queryByText(/password is a required field/i)).not.toBeInTheDocument());
    await waitFor(() => expect(button).toBeDisabled());

    await user.click(email);

    await waitFor(() => screen.findByText(/email is a required field/i));
    await waitFor(() => screen.findByText(/password is a required field/i));
    await waitFor(() => expect(button).toBeDisabled());

    await user.type(email, 'email.address@is');

    await waitFor(() => screen.findByText(/email must be a valid email/i));
    await waitFor(() => expect(screen.queryByText(/email is a required field/i)).not.toBeInTheDocument());
    await waitFor(() => expect(button).toBeDisabled());

    await user.type(email, '.valid');

    await waitFor(() => expect(screen.queryByText(/email is a required field/i)).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/email must be a valid email/i)).not.toBeInTheDocument());
    await waitFor(() => expect(button).toBeDisabled());

    await user.type(password, '0123456789');

    await waitFor(() => screen.findByText(/password must be at least 16 characters/i));
    await waitFor(() => expect(screen.queryByText(/password is a required field/i)).not.toBeInTheDocument());
    await waitFor(() => expect(button).toBeDisabled());

    await user.type(password, '012345');

    await waitFor(() => expect(screen.queryByText(/password is a required field/i)).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/password must be at least 16 characters/i)).not.toBeInTheDocument());
    await waitFor(() => expect(button).toBeEnabled());
  });

  test('form field email gets validated on the backend', async () => {
    mockPost.mockRejectedValueOnce({
      response: {
        data: { message: 'User not found', type: 'ValidationError', validation: { email: ['User not found'] } },
      },
    });

    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    const email = screen.getByRole('textbox', {
      name: /email/i,
    });
    const password = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', {
      name: /login/i,
    });

    await user.type(email, 'email.address@is.non.existent');
    await user.type(password, 'password-is-correct');
    await user.click(button);

    await waitFor(() => expect(button).toBeDisabled());
    await waitFor(() => screen.findByText(/user not found/i));
  });

  test('form field password gets validated on the backend', async () => {
    mockPost.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Incorrect password',
          type: 'ValidationError',
          validation: { password: ['Incorrect password'] },
        },
      },
    });

    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    const email = screen.getByRole('textbox', {
      name: /email/i,
    });
    const password = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', {
      name: /login/i,
    });

    await user.type(email, 'email.address@is.existent');
    await user.type(password, 'password-is-incorrect');
    await user.click(button);

    await waitFor(() => screen.findByText(/incorrect password/i));
    await waitFor(() => expect(button).toBeDisabled());
  });

  test('user gets redirected on success', async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        payload: {
          token: 'hbGciOiJIUzI1NiJ9.ImNkZThhYTdiNWViYmViZDJhZmVlMjIwOSJ9.YMQBaGb5LiPKE1-On17t38',
        },
        type: 'Success',
      },
    });

    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    const email = screen.getByRole('textbox', {
      name: /email/i,
    });
    const password = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', {
      name: /login/i,
    });

    await user.type(email, 'email.address@is.existent');
    await user.type(password, 'password-is-correct');
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
