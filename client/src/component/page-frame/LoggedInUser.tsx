import { Logout, Replay } from '@mui/icons-material';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { fetchLoggedInUser } from 'src/component/page-frame/fetchLoggedInUser';
import { useLogout } from 'src/hook';
import { selectAuthorization, selectLoggedInUser, setLoggedInUser, useAppDispatch, useAppSelector } from 'src/redux';
import { QueryKey } from 'src/type';
import { User } from 'todos-shared';

export function LoggedInUser(): JSX.Element {
  const authorization = useAppSelector(selectAuthorization);
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();
  const logout = useLogout();

  const { data, isLoading, isSuccess, isError, error, refetch } = useQuery<Pick<User, 'name'>, AxiosError>(
    [QueryKey.LoggedInUser],
    fetchLoggedInUser,
    {
      enabled: !!authorization && !loggedInUser,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLoggedInUser(data));
    }
  }, [data, dispatch, isSuccess]);

  const refetchLoggedInUser = () => refetch();

  return (
    <>
      {loggedInUser && (
        <Button variant='text' color='inherit' onClick={logout} endIcon={<Logout />}>
          {loggedInUser.name}
        </Button>
      )}
      {isLoading && <CircularProgress color='inherit' size={16} />}
      {isError && (
        <Button variant='text' color='inherit' onClick={refetchLoggedInUser} endIcon={<Replay />}>
          {error.message}
        </Button>
      )}
    </>
  );
}
