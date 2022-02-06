import CssBaseline from '@mui/material/CssBaseline';
import { Router } from 'src/component/Router';
import { ErrorBoundary } from './ErrorBoundary';

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
