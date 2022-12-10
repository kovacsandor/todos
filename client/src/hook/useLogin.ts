import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, useAppDispatch } from 'src/redux';
import { LocalStorageKey } from 'src/type';

export function useLogin(): (token: string) => void {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const redirect = useCallback((): void => {
    navigate('/');
  }, [navigate]);

  return (token: string): void => {
    localStorage.setItem(LocalStorageKey.Token, token);
    dispatch(setToken(token));
    redirect();
  };
}
