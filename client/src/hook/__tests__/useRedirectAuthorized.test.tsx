import { configureStore } from '@reduxjs/toolkit';
import { renderHook, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { useRedirectAuthorized } from 'src/hook/useRedirectAuthorized';
import { storeOptionReducer } from 'src/redux/storeOptionReducer';

const store = configureStore({
  preloadedState: { authorization: 'Token' },
  reducer: storeOptionReducer,
});

const Consumer = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div>pathname: {pathname}</div>
    </>
  );
};

describe('useRedirectAuthorized', () => {
  test('user gets redirected', () => {
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

    renderHook(() => useRedirectAuthorized(), {
      wrapper,
    });

    screen.getByText(/pathname: \//i);
  });
});
