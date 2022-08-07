import { onFulfilled } from 'src/component/authorized/onFulfilled';

describe('onFulfilled', () => {
  test('returns value as is', () => {
    const value = 'value';
    expect(onFulfilled(value)).toBe(value);
  });
});
