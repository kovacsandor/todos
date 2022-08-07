import axios from 'axios';
import { AuthorizedProps } from 'src/component/authorized/AuthorizedProps';
import { onFulfilled } from 'src/component/authorized/onFulfilled';
import { useOnRejected } from 'src/component/authorized/useOnRejected';
import { selectAuthorization, useAppSelector } from 'src/redux';

export function Authorized({ children }: AuthorizedProps): JSX.Element {
  const onRejected = useOnRejected();
  const authorization = useAppSelector(selectAuthorization);

  axios.defaults.headers.common['Authorization'] = authorization || '';
  axios.interceptors.response.use(onFulfilled, onRejected);

  return <>{children}</>;
}
