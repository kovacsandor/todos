import { AlertProps } from '@mui/material/Alert';
import { AlertTitleProps } from '@mui/material/AlertTitle';
import { render, screen, within } from '@testing-library/react';
import { ErrorBoundary } from 'src/component/error-boundary';

jest.mock('@mui/material/Alert', () => ({ children, severity }: AlertProps) => (
  <div>
    Alert
    <div>severity is {severity}</div>
    <div>{children}</div>
  </div>
));

jest.mock('@mui/material/AlertTitle', () => ({ children }: AlertTitleProps) => (
  <div>
    AlertTitle
    <div>{children}</div>
  </div>
));

describe('ErrorBoundary', () => {
  test('renders children if there is no error', () => {
    render(
      <ErrorBoundary error={false} message='message'>
        children
      </ErrorBoundary>,
    );
    screen.getByText(/children/i);
    expect(screen.queryByText(/message/i)).toBeNull();
  });

  describe('if there is an error', () => {
    const consoleError = jest.spyOn(console, 'error');
    beforeEach(() => {
      render(
        <ErrorBoundary error={true} message='message'>
          children
        </ErrorBoundary>,
      );
    });

    test('logs message', () => {
      expect(consoleError).toBeCalledWith('message');
    });

    test('renders message', () => {
      screen.getByText(/message/i);
      expect(screen.queryByText(/children/i)).toBeNull();
    });

    test('element structure is correct', () => {
      const alert = screen.getByText(/^alert$/i);
      const alertTitle = within(alert).getByText(/alertTitle/i);
      within(alert).getByText(/message/i);
      within(alertTitle).getByText(/error/i);
    });

    test('alert is configured correctly', () => {
      screen.getByText(/severity is error/i);
    });
  });
});
