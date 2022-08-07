import { renderHook } from '@testing-library/react';
import { AxiosError } from 'axios';
import { useOnRejected } from 'src/component/authorized/useOnRejected';
import { setToken, useAppDispatch } from 'src/redux';
import { LocalStorageKey } from 'src/type';
const mockSetToken = jest.fn<typeof mockSetTokenAction, Parameters<typeof setToken>>();
const mockSetTokenAction = 'mockSetTokenReturnValue';
const mockUseAppDispatch = jest.fn<ReturnType<typeof useAppDispatch>, Parameters<typeof useAppDispatch>>();
const mockDispatch = jest.fn();

jest.mock('src/redux', () => ({
  setToken: (payload: string | null) => mockSetToken(payload),
  useAppDispatch: () => mockUseAppDispatch(),
}));

const mockRemoveItem = jest.fn();

const localStorageMock = (() => {
  return {
    removeItem: (key: string) => mockRemoveItem(key),
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useOnRejected', () => {
  test('if user gets unauthorized', () => {
    mockSetToken.mockReturnValue(mockSetTokenAction);
    mockUseAppDispatch.mockReturnValue(mockDispatch);
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
      expect(mockSetToken).toBeCalledWith(null);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(mockDispatch).toBeCalledWith(mockSetTokenAction);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(mockRemoveItem).toBeCalledWith(LocalStorageKey.Token);
    }
  });
  test('if user does not get unauthorized', () => {
    mockSetToken.mockReturnValue(mockSetTokenAction);
    mockUseAppDispatch.mockReturnValue(mockDispatch);
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
    }
  });
});
