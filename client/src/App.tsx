import CssBaseline from '@mui/material/CssBaseline';
import { ErrorBoundary } from 'src/component';
import { Router } from 'src/router';

export function App() {
  return (
    <ErrorBoundary
      error={!process.env.REACT_APP_BACKEND_API_URL}
      message='process.env.REACT_APP_BACKEND_API_URL is undefined'
    >
      <CssBaseline />
      <Router />
    </ErrorBoundary>
  );
}
