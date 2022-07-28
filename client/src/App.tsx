import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'src/component';
import { Router } from 'src/router';

export function App() {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary
      error={!process.env.REACT_APP_BACKEND_API_URL}
      message='process.env.REACT_APP_BACKEND_API_URL is undefined'
    >
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
