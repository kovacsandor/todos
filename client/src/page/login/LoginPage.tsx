import { Card, CardContent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'src/component/container';
import { FieldEmail } from 'src/page/login/FieldEmail';
import { FieldPassword } from 'src/page/login/FieldPassword';
import { logIn } from 'src/page/login/logIn';
import { SubmitButton } from 'src/page/login/SubmitButton';
import { selectAuthorization, setToken, useAppDispatch, useAppSelector } from 'src/redux';
import { LocalStorageKey } from 'src/type';
import { Login, loginValidationSchema } from 'todos-shared';

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const authorization = useAppSelector(selectAuthorization);
  const dispatch = useAppDispatch();
  const { isLoading, mutate, error, data, isSuccess } = useMutation<
    Login['response'],
    AxiosError<Login['response'], Login['requestBody']>,
    Login['requestBody']
  >(logIn);

  const redirect = useCallback((): void => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (authorization) {
      redirect();
    }
  });

  useEffect(() => {
    if (isSuccess && data.type === 'Success') {
      localStorage.setItem(LocalStorageKey.Token, data.payload.token);
      dispatch(setToken(data.payload.token));
      redirect();
    }
  }, [data, dispatch, isSuccess, redirect]);

  const initialValues: Login['requestBody'] = {
    email: '',
    password: '',
  };

  const onSubmit = (values: Login['requestBody']): void => mutate(values);

  return (
    <Container>
      <Card>
        <CardContent>
          <Formik<Login['requestBody']>
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginValidationSchema}
          >
            <Form>
              <Stack spacing={3}>
                <Typography gutterBottom variant='h5' component='div'>
                  Welcome to {process.env.REACT_APP_TITLE}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Please log in before continuing.
                </Typography>
                <FieldEmail error={error} isLoading={isLoading} />
                <FieldPassword error={error} isLoading={isLoading} />
                <SubmitButton isLoading={isLoading} />
              </Stack>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
}
