import { renderHook } from '@testing-library/react';
import { useLogout } from 'src/hook/useLogout';
import { setToken, useAppDispatch } from 'src/redux';
import { LocalStorageKey } from 'src/type';

const mockDispatch = jest.fn();
const mockRemoveItem = jest.fn();
const mockRemoveQueries = jest.fn();
const mockSetToken = jest.fn<typeof mockSetTokenAction, Parameters<typeof setToken>>();
const mockSetTokenAction = 'mockSetTokenReturnValue';
const mockUseAppDispatch = jest.fn<ReturnType<typeof useAppDispatch>, Parameters<typeof useAppDispatch>>();

const localStorageMock = (() => {
  return {
    removeItem: (key: string) => mockRemoveItem(key),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

jest.mock('src/redux', () => ({
  setToken: (payload: string | null) => mockSetToken(payload),
  useAppDispatch: () => mockUseAppDispatch(),
}));

jest.mock('src/react-query', () => ({
  queryClient: { removeQueries: () => mockRemoveQueries() },
}));

describe('useLogout', () => {
  test('user gets logged out', () => {
    mockSetToken.mockReturnValue(mockSetTokenAction);
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    const { result } = renderHook(useLogout);

    result.current();

    expect(mockRemoveQueries).toBeCalled();
    expect(mockSetToken).toBeCalledWith(null);
    expect(mockDispatch).toBeCalledWith(mockSetTokenAction);
    expect(mockRemoveItem).toBeCalledWith(LocalStorageKey.Token);
  });
});
