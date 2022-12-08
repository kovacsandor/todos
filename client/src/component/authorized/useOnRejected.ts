import { AxiosError } from 'axios';
import { useLogout } from 'src/hook';

export const useOnRejected = (): ((error: AxiosError) => never) => {
  const logout = useLogout();

  return (error: AxiosError): never => {
    if (error.response?.status === 401) {
      logout();
    }
    throw error;
  };
};
