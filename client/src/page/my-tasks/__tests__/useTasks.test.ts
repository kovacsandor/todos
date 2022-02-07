import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useTasks } from 'src/page/my-tasks/useTasks';

const mockFetchReturnValue = 'mockFetchReturnValue';
const mockFetchMyTasks = jest.fn<Promise<typeof mockFetchReturnValue>, [number]>();

jest.mock('src/page/my-tasks/fetchMyTasks', () => ({
  fetchMyTasks: (from: number): Promise<typeof mockFetchReturnValue> => mockFetchMyTasks(from),
}));

describe('useTask', () => {
  test('tasks have zero elements initially', async () => {
    const { result } = renderHook(useTasks);
    expect(result.current).toHaveLength(0);
    await waitFor(() => {});
  });

  test('tasks is set to fetch resolved value once finished', async () => {
    mockFetchMyTasks.mockResolvedValueOnce(mockFetchReturnValue);
    const { result } = renderHook(useTasks);
    await waitFor(() => {});
    expect(result.current).toBe(mockFetchReturnValue);
  });
});
