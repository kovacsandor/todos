import { AxiosError } from 'axios';
import { setToken, useAppDispatch } from 'src/redux';
import { LocalStorageKey } from 'src/type';

export const useOnRejected = (): ((error: AxiosError) => never) => {
  const dispatch = useAppDispatch();

  return (error: AxiosError): never => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LocalStorageKey.Token);
      dispatch(setToken(null));
    }
    throw error;
  };
};
