import { renderHook } from '@testing-library/react-hooks';
import { Location } from 'react-router-dom';
import { useNavigationValue } from 'src/component/Page/useNavigationValue';

const mockUseLocation = jest.fn<Pick<Location, 'pathname'>, []>();

jest.mock('react-router-dom', () => ({
  useLocation: () => mockUseLocation(),
}));

describe('useNavigationValue', () => {
  describe('route', () => {
    test('/todos/my-tasks is configured', () => {
      mockUseLocation.mockReturnValueOnce({ pathname: '/todos/my-tasks' });
      const { result } = renderHook(useNavigationValue);
      expect(result.current).toBe(0);
    });

    test('/todo/new is configured', () => {
      mockUseLocation.mockReturnValueOnce({ pathname: '/todo/new' });
      const { result } = renderHook(useNavigationValue);
      expect(result.current).toBe(1);
    });

    test('/todos/completed is configured', () => {
      mockUseLocation.mockReturnValueOnce({ pathname: '/todos/completed' });
      const { result } = renderHook(useNavigationValue);
      expect(result.current).toBe(2);
    });
  });

  test('invalid case is handled', () => {
    mockUseLocation.mockReturnValueOnce({ pathname: '/something/else' });
    const { result } = renderHook(useNavigationValue);
    expect(result.current).toBeNull();
  });
});
