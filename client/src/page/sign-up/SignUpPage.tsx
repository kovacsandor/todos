import { Login } from '@mui/icons-material';
import { Button, Card, CardContent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'src/component/container';
import { useLogin, useRedirectAuthorized } from 'src/hook';
import { FieldEmail } from 'src/page/sign-up/FieldEmail';
import { FieldName } from 'src/page/sign-up/FieldName';
import { FieldPassword } from 'src/page/sign-up/FieldPassword';
import { FieldPasswordConfirmation } from 'src/page/sign-up/FieldPasswordConfirmation';
import { signUp } from 'src/page/sign-up/signUp';
import { SubmitButton } from 'src/page/sign-up/SubmitButton';
import { SignUp, signUpValidationSchema } from 'todos-shared';

export function SignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const login = useLogin();
  const { isLoading, mutate, error, data, isSuccess } = useMutation<
    SignUp['response'],
    AxiosError<SignUp['response'], SignUp['requestBody']>,
    SignUp['requestBody']
  >(signUp);

  const navigateToLoginPage = useCallback((): void => {
    navigate('/login');
  }, [navigate]);

  useRedirectAuthorized();

  useEffect(() => {
    if (isSuccess && data.type === 'Success') {
      login(data.payload.token);
    }
  }, [data, isSuccess, login]);

  const initialValues: SignUp['requestBody'] = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  };

  const onSubmit = (values: SignUp['requestBody']): void => mutate(values);

  return (
    <Container>
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Formik<SignUp['requestBody']>
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={signUpValidationSchema}
            >
              <Form>
                <Stack spacing={3}>
                  <Typography gutterBottom variant='h5' component='div'>
                    Welcome to {process.env.REACT_APP_TITLE}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Sign up to get started.
                  </Typography>
                  <FieldName error={error} isLoading={isLoading} />
                  <FieldEmail error={error} isLoading={isLoading} />
                  <FieldPassword error={error} isLoading={isLoading} />
                  <FieldPasswordConfirmation error={error} isLoading={isLoading} />
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
                Already signed up?
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Please log in before continuing.
              </Typography>
              <Button variant='outlined' color='secondary' endIcon={<Login />} onClick={navigateToLoginPage}>
                Login
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
