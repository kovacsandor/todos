import { AxiosResponse } from 'axios';
import { fetchCompletedTasks } from 'src/page/completed-tasks/fetchCompletedTasks';

const mockData = {
  type: 'Success',
  payload: { tasks: 'mockData' },
};
type Response = Pick<AxiosResponse<typeof mockData>, 'data'>;
const mockGet = jest.fn<Promise<Response>, [string]>();

jest.mock('axios', () => ({
  get: (url: string): Promise<Response> => mockGet(url),
}));

describe('fetchCompletedTasks', () => {
  const from: number = 0;

  beforeEach(() => {
    mockGet.mockResolvedValueOnce({
      data: mockData,
    });
  });

  test('calls correct api endpoint', async () => {
    await fetchCompletedTasks(from);
    expect(mockGet).toBeCalledWith('REACT_APP_ORIGIN/api/task-service/completed-tasks/0');
  });

  test('returns endpoint response data', async () => {
    const data = await fetchCompletedTasks(from);
    expect(data).toBe(mockData.payload.tasks);
  });
});
