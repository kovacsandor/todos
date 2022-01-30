import { renderHook } from '@testing-library/react-hooks';
import { useGetRoute } from 'src/component/Page/useGetRoute';

describe('useGetRoute', () => {
  describe('route', () => {
    test('/todos/my-tasks is configured', () => {
      const { result } = renderHook(useGetRoute);
      expect(result.current(0)).toBe('/todos/my-tasks');
    });

    test('/todo/new is configured', () => {
      const { result } = renderHook(useGetRoute);
      expect(result.current(1)).toBe('/todo/new');
    });

    test('/todos/completed is configured', () => {
      const { result } = renderHook(useGetRoute);
      expect(result.current(2)).toBe('/todos/completed');
    });
  });

  test('invalid case is handled', () => {
    const { result } = renderHook(useGetRoute);
    expect(() => result.current(3)).toThrowError('Invalid case');
  });
});
