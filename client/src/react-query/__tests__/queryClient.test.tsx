import { queryClient } from 'src/react-query';

type MockQueryClient = { readonly id: 'MockQueryClient' };

jest.mock('@mui/material/CssBaseline', () => () => <div>CssBaseline</div>);

jest.mock('@tanstack/react-query', () => ({
  QueryClient: function (): MockQueryClient {
    return { id: 'MockQueryClient' };
  },
}));

describe('queryClient', () => {
  test('creates a new QueryClient', () => {
    expect((queryClient as unknown as MockQueryClient).id).toBe('MockQueryClient');
  });
});
