import { renderHook } from '@testing-library/react';
import { AxiosError } from 'axios';
import { useOnRejected } from 'src/component/authorized/useOnRejected';

const mockUseLogout = jest.fn();

jest.mock('src/hook', () => ({
  useLogout: () => () => mockUseLogout(),
}));

describe('useOnRejected', () => {
  test('if user gets unauthorized', () => {
    const { result } = renderHook(useOnRejected);
    const error = new AxiosError(
      'Error message',
      '401',
      {},
      {},
      { status: 401, data: '', config: {}, statusText: 'afs', headers: {} },
    );

    try {
      result.current(error);
    } catch (err) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err).toHaveProperty('message', 'Error message');
      // eslint-disable-next-line jest/no-conditional-expect
      expect(mockUseLogout).toBeCalled();
    }
  });
  test('if user does not get unauthorized', () => {
    const { result } = renderHook(useOnRejected);
    const error = new AxiosError(
      'Error message',
      '400',
      {},
      {},
      { status: 400, data: '', config: {}, statusText: 'afs', headers: {} },
    );
    try {
      result.current(error);
    } catch (err) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err).toHaveProperty('message', 'Error message');
      // eslint-disable-next-line jest/no-conditional-expect
      expect(mockUseLogout).not.toBeCalled();
    }
  });
});
