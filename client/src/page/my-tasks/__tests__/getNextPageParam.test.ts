import { getNextPageParam } from 'src/page/my-tasks/getNextPageParam';

describe('getNextPageParam', () => {
  test('calls correct api endpoint', async () => {
    const result = getNextPageParam(10);
    const nextPageParam = result(new Array(10), new Array(1));
    expect(nextPageParam).toBe(1);
  });

  test('returns endpoint response data', async () => {
    const result = getNextPageParam(10);
    const nextPageParam = result(new Array(9), new Array(1));
    expect(nextPageParam).toBe(false);
  });
});
