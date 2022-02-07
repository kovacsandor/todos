import { AxiosResponse } from 'axios';
import { fetchMyTasks } from 'src/page/my-tasks/fetchMyTasks';

const mockData = 'mockData';
type Response = Pick<AxiosResponse<typeof mockData>, 'data'>;
const mockGet = jest.fn<Promise<Response>, [string]>();

jest.mock('axios', () => ({
  get: (url: string): Promise<Response> => mockGet(url),
}));

describe('fetchMyTasks', () => {
  const from: number = 0;

  beforeEach(() => {
    mockGet.mockResolvedValueOnce({
      data: mockData,
    });
  });

  test('calls correct api endpoint', async () => {
    await fetchMyTasks(from);
    expect(mockGet).toBeCalledWith(`http://localhost:8080/api/todos/my-tasks/${from}`);
  });

  test('returns endpoint response data', async () => {
    const data = await fetchMyTasks(from);
    expect(data).toBe(data);
  });
});
