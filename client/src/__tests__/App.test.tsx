import { render, screen } from '@testing-library/react';
import { App } from 'src/App';
import { IErrorBoundaryProps } from 'src/component/error-boundary/IErrorBoundaryProps';

jest.mock('@mui/material/CssBaseline', () => () => <div>CssBaseline</div>);

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
});