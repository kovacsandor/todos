import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RedirectProps } from 'src/component/RedirectProps';

export function Redirect({
  redirectFrom,
  redirectTo,
}: RedirectProps): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const shouldRedirect = useMemo(
    () => pathname === redirectFrom,
    [pathname, redirectFrom],
  );

  useEffect((): void => {
    if (shouldRedirect) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo, shouldRedirect]);

  return <>{shouldRedirect ? `Redirecting to ${redirectTo}...` : <Outlet />}</>;
}
