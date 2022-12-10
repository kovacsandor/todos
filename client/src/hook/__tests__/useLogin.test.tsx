import { renderHook, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { useLogin } from 'src/hook/useLogin';
import { selectAuthorization, store, useAppSelector } from 'src/redux';
import { LocalStorageKey } from 'src/type';

const mockSetItem = jest.fn();

const localStorageMock = (() => {
  return {
    setItem: (key: string, value: string) => mockSetItem(key, value),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const Consumer = () => {
  const authorization = useAppSelector(selectAuthorization);
  const { pathname } = useLocation();

  return (
    <>
      <div>authorization: {authorization}</div>
      <div>pathname: {pathname}</div>
    </>
  );
};

describe('useLogin', () => {
  test('user gets logged in', () => {
    const wrapper = ({ children }: any) => (
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            {
              pathname: '/sign-in',
            },
          ]}
        >
          <Consumer />
          {children}
        </MemoryRouter>
      </Provider>
    );

    const { result } = renderHook(useLogin, {
      wrapper,
    });

    act(() => result.current('Token'));

    screen.getByText(/authorization: token/i);
    screen.getByText(/pathname: \//i);
    expect(mockSetItem).toBeCalledWith(LocalStorageKey.Token, 'Token');
  });
});
