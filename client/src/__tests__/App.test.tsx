import { render, screen, within } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { App } from 'src/App';
import { IErrorBoundaryProps } from 'src/component/error-boundary/IErrorBoundaryProps';

type MockQueryClient = { readonly id: 'MockQueryClient' };

jest.mock('@mui/material/CssBaseline', () => () => <div>CssBaseline</div>);

jest.mock('@tanstack/react-query', () => ({
  QueryClient: function (): MockQueryClient {
    return { id: 'MockQueryClient' };
  },
  QueryClientProvider: ({ children, client }: PropsWithChildren<{ readonly client: MockQueryClient }>) => (
    <div>
      QueryClientProvider
      <div>client is {client.id}</div>
      <div>{children}</div>
    </div>
  ),
}));

jest.mock('src/component', () => ({
  ErrorBoundary: ({ children, error, message }: IErrorBoundaryProps) => (
    <div>
      ErrorBoundary
      {!error && <div>no error</div>}
      <div>{message}</div>
      <div>{children}</div>
    </div>
  ),
}));

jest.mock('src/router', () => ({
  Router: () => <div>router</div>,
}));

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders ErrorBoundary', () => {
    screen.getByText(/ErrorBoundary/i);
    screen.getByText(/process\.env\.react_app_backend_api_url is undefined/i);
    screen.getByText(/no error/i);
  });

  test('renders CssBaseline', () => {
    screen.getByText(/CssBaseline/i);
  });

  test('renders router', () => {
    screen.getByText(/router/i);
  });

  test('QueryClientProvider is configured', () => {
    const queryClientProvider = screen.getByText(/QueryClientProvider/i);
    screen.getByText(/client is MockQueryClient/i);
    within(queryClientProvider).getByText(/router/i);
  });
});
