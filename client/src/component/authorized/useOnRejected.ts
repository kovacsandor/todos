import { AxiosError } from 'axios';
import { useLogout } from 'src/hook';
import { StatusCode } from 'todos-shared';

export const useOnRejected = (): ((error: AxiosError) => never) => {
  const logout = useLogout();

  return (error: AxiosError): never => {
    if (error.response?.status === StatusCode.Unauthorized) {
      logout();
    }
    throw error;
  };
};
