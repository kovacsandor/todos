import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectAuthorization, useAppSelector } from 'src/redux';

export function useRedirectAuthorized(): void {
  const navigate = useNavigate();
  const authorization = useAppSelector(selectAuthorization);

  useEffect(() => {
    if (authorization) {
      navigate('/');
    }
  }, [authorization, navigate]);
}
