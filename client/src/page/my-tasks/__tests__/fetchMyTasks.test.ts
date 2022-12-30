import { AxiosResponse } from 'axios';
import { createUrl } from 'src/helper';
import { fetchMyTasks } from 'src/page/my-tasks/fetchMyTasks';
import { replaceParams } from 'todos-shared';

const mockData = {
  type: 'Success',
  payload: { tasks: 'mockData' },
};
type Response = Pick<AxiosResponse<typeof mockData>, 'data'>;
const mockGet = jest.fn<Promise<Response>, [string]>();
const mockCreateUrl = jest.fn<ReturnType<typeof createUrl>, Parameters<typeof createUrl>>();
const mockReplaceParams = jest.fn<ReturnType<typeof replaceParams>, Parameters<typeof replaceParams>>();
const mockUrl = 'mockUrl';
const mockReplacedUrl = 'mockReplacedUrl';

jest.mock('axios', () => ({
  get: (url: string): Promise<Response> => mockGet(url),
}));

jest.mock('src/helper', () => ({
  createUrl: (path: string): string => mockCreateUrl(path),
}));

jest.mock('todos-shared', () => ({
  replaceParams: (url: string, params: Record<string, string>): string => mockReplaceParams(url, params),
}));

describe('fetchMyTasks', () => {
  const from: number = 0;

  beforeEach(() => {
    mockCreateUrl.mockReturnValueOnce(mockUrl);
    mockReplaceParams.mockReturnValueOnce(mockReplacedUrl);
    mockGet.mockResolvedValueOnce({
      data: mockData,
    });
  });

  test('calls correct api endpoint', async () => {
    await fetchMyTasks(from);
    expect(mockCreateUrl).toBeCalledWith(`/api/task-service/my-tasks/:from`);
    expect(mockReplaceParams).toBeCalledWith(mockUrl, { from: String(from) });
    expect(mockGet).toBeCalledWith(mockReplacedUrl);
  });

  test('returns endpoint response data', async () => {
    const data = await fetchMyTasks(from);
    expect(data).toBe(mockData.payload.tasks);
  });
});
