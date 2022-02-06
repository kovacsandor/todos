import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { IErrorBoundaryProps } from 'src/component/IErrorBoundaryProps';

export function ErrorBoundary({ children, error, message }: IErrorBoundaryProps): JSX.Element {
  if (error) {
    console.error(message);
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    );
  }

  return <>{children}</>;
}
