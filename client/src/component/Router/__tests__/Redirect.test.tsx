import { render, screen } from '@testing-library/react';
import { Redirect } from 'src/component/Router/Redirect';

const mockNavigate = jest.fn();

const shouldBeRedirected = 'shouldBeRedirected';
const shouldNotBeRedirected = 'shouldNotBeRedirected';
const redirectTo = 'redirectTo';
const redirectedComponent = 'redirectedComponent';

jest.mock('react-router-dom', () => ({
  Outlet: () => <>{redirectedComponent}</>,
  useLocation: (): Pick<Location, 'pathname'> => ({
    pathname: shouldBeRedirected,
  }),
  useNavigate: () => mockNavigate,
}));

describe('Redirect', () => {
  beforeEach(() => {});

  test('redirects when redirect from is equal to location path', async () => {
    render(
      <Redirect redirectFrom={shouldBeRedirected} redirectTo={redirectTo} />,
    );
    screen.getByText(`Redirecting to ${redirectTo}...`);
    expect(mockNavigate).toBeCalledWith(redirectTo);
  });

  test('does not redirect when redirect from is not equal to location path', async () => {
    render(
      <Redirect redirectFrom={shouldNotBeRedirected} redirectTo={redirectTo} />,
    );
    screen.getByText(redirectedComponent);
    expect(mockNavigate).not.toBeCalled();
  });
});
