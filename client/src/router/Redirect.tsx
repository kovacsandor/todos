import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IRedirectProps } from 'src/router/IRedirectProps';

export function Redirect({ redirectFrom, redirectTo }: IRedirectProps): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const shouldRedirect = useMemo(() => pathname === redirectFrom, [pathname, redirectFrom]);

  useEffect((): void => {
    if (shouldRedirect) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo, shouldRedirect]);

  return <>{shouldRedirect ? `Redirecting to ${redirectTo}...` : <Outlet />}</>;
}
