import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavigationValue() {
  const { pathname } = useLocation();

  const value = useMemo(() => {
    switch (pathname) {
      case '/todos/my-tasks':
        return 0;
      case '/todo/new':
        return 1;
      case '/todos/completed':
        return 2;
      default:
        return null;
    }
  }, [pathname]);

  return value;
}
