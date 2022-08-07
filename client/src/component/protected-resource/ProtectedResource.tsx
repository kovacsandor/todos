import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProtectedResourceProps } from 'src/component/protected-resource/IProtectedResourceProps';
import { selectAuthorization, useAppSelector } from 'src/redux';

export function ProtectedResource({ children }: IProtectedResourceProps): JSX.Element {
  const authorization = useAppSelector(selectAuthorization);

  const navigate = useNavigate();

  useEffect((): void => {
    if (!authorization) {
      navigate('/login');
    }
  }, [navigate, authorization]);

  return <>{authorization && children}</>;
}
