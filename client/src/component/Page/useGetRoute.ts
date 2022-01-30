import { useCallback } from 'react';

export function useGetRoute() {
  return useCallback((value: number): string => {
    switch (value) {
      case 0:
        return '/todos/my-tasks';
      case 1:
        return '/todo/new';
      case 2:
        return '/todos/completed';
      default:
        throw new Error('Invalid case');
    }
  }, []);
}
