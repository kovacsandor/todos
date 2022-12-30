import { PersonAdd } from '@mui/icons-material';
import { Button, Card, CardContent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'src/component/container';
import { useLogin, useRedirectAuthorized } from 'src/hook';
import { FieldEmail } from 'src/page/login/FieldEmail';
import { FieldPassword } from 'src/page/login/FieldPassword';
import { logIn } from 'src/page/login/logIn';
import { SubmitButton } from 'src/page/login/SubmitButton';
import { Login, loginValidationSchema } from 'todos-shared';

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const login = useLogin();
  const { isLoading, mutate, error, data, isSuccess } = useMutation<
    Login['response'],
    AxiosError<Login['response'], Login['requestBody']>,
    Login['requestBody']
  >(logIn);

  const signUp = useCallback((): void => {
    navigate('/sign-up');
  }, [navigate]);

  useRedirectAuthorized();

  useEffect(() => {
    if (isSuccess && data.type === 'Success') {
      login(data.payload.token);
    }
  }, [data, isSuccess, login]);

  const initialValues: Login['requestBody'] = {
    email: '',
    password: '',
  };

  const onSubmit = (values: Login['requestBody']): void => mutate(values);

  return (
    <Container>
      <Stack spacing={3}>
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
                    Welcome to {process.env.REACT_APP_WEBSITE_NAME}
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
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography gutterBottom variant='h6' component='div'>
                New here?
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Sign up to get started.
              </Typography>
              <Button variant='outlined' color='secondary' endIcon={<PersonAdd />} onClick={signUp}>
                Sign up
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
