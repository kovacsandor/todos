import { AxiosResponse } from 'axios';
import { fetchMyTasks } from 'src/component/fetchMyTasks';

const mockData = 'mockData';
type Response = Pick<AxiosResponse<typeof mockData>, 'data'>;
const mockGet = jest.fn<Promise<Response>, [string]>();

jest.mock('axios', () => ({
  get: (url: string): Promise<Response> => mockGet(url),
}));

describe('fetchMyTasks', () => {
  test('calls correct api endpoint', () => {
    const from: number = 0;
    fetchMyTasks(from);
    expect(mockGet).toBeCalledWith(`http://localhost:8080/api/todos/my-tasks/${from}`);
  });

  test('returns endpoint response data', async () => {
    mockGet.mockResolvedValueOnce({
      data: mockData,
    });
    const data = await fetchMyTasks(0);
    expect(data).toBe(data);
  });
});
