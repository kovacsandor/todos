import AccountCircle from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchLoggedInUser } from 'src/component/page-frame/fetchLoggedInUser';
import { selectAuthorization, selectLoggedInUser, setLoggedInUser, useAppDispatch, useAppSelector } from 'src/redux';
import { QueryKey } from 'src/type';

export function LoggedInUser(): JSX.Element {
  const authorization = useAppSelector(selectAuthorization);
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess } = useQuery([QueryKey.LoggedInUser], fetchLoggedInUser, {
    enabled: !!authorization && !loggedInUser,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLoggedInUser(data));
    }
  }, [data, dispatch, isSuccess]);

  return (
    <>
      {loggedInUser && (
        <Stack direction='row' spacing={2}>
          <Typography variant='button'>{loggedInUser.name}</Typography>
          <AccountCircle />
        </Stack>
      )}
      {authorization && isLoading && <CircularProgress color='inherit' size={16} />}
    </>
  );
}
