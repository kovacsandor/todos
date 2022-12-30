import { createUrl } from 'src/helper/createUrl';

describe('createUrl', () => {
  test('url is correct', () => {
    const url = createUrl('/path');
    expect(url).toBe('REACT_APP_ORIGIN/path');
  });
});
