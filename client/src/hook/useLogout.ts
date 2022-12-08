import { queryClient } from 'src/react-query';
import { setToken, useAppDispatch } from 'src/redux';
import { LocalStorageKey } from 'src/type';

export const useLogout = (): (() => void) => {
  const dispatch = useAppDispatch();

  return (): void => {
    localStorage.removeItem(LocalStorageKey.Token);
    dispatch(setToken(null));
    queryClient.removeQueries();
  };
};
