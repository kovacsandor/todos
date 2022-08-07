import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { Authorized } from 'src/component/authorized/Authorized';
import { useAppSelector } from 'src/redux';
import { DeepPartial } from 'src/type';

type Interceptor = typeof axios['interceptors']['response']['use'];
const mockUseAppSelector = jest.fn<ReturnType<typeof useAppSelector>, Parameters<typeof useAppSelector>>();
const mockInterceptor = jest.fn<ReturnType<Interceptor>, Parameters<Interceptor>>();

jest.mock(
  'axios',
  (): DeepPartial<typeof axios> => ({
    defaults: {
      headers: {
        common: {},
      },
    },
    interceptors: {
      response: {
        use: (onFulfilled: Parameters<Interceptor>[0], onRejected: Parameters<Interceptor>[1]) =>
          mockInterceptor(onFulfilled, onRejected),
      },
    },
  }),
);

jest.mock('src/component/authorized/onFulfilled', () => ({
  onFulfilled: 'mockOnFulfilled',
}));

jest.mock('src/component/authorized/useOnRejected', () => ({
  useOnRejected: () => 'mockUseOnRejected',
}));

jest.mock('src/redux', () => ({
  selectAuthorization: 'selectAuthorization',
  useAppSelector: (selector: Parameters<typeof useAppSelector>[0]) => mockUseAppSelector(selector),
}));

describe('Authorized', () => {
  const pageChildren = 'pageChildren';

  test('children are rendered', () => {
    render(<Authorized>{pageChildren}</Authorized>);
    screen.getAllByText(/pageChildren/i);
  });

  test('authorization header is set to redux state', () => {
    mockUseAppSelector.mockReturnValue('Token');
    render(<Authorized>{pageChildren}</Authorized>);
    expect(mockUseAppSelector).toBeCalledWith('selectAuthorization');
    expect(axios.defaults.headers.common['Authorization']).toBe('Token');
  });

  test('response interceptor is configured', () => {
    render(<Authorized>{pageChildren}</Authorized>);
    expect(mockInterceptor).toBeCalledWith('mockOnFulfilled', 'mockUseOnRejected');
  });
});
