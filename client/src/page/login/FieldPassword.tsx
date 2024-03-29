import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { FormikTextField } from 'src/component';
import { Login } from 'todos-shared';

type Props = {
  readonly error: AxiosError<Login['response'], Login['requestBody']> | null;
  readonly isLoading: boolean;
};

export function FieldPassword({ error, isLoading }: Props): JSX.Element {
  const onResponseError = useCallback(
    (setError: (value: string) => void): void => {
      if (error?.response?.data.type === 'ValidationError' && error.response.data.validation.password) {
        setError(error.response.data.validation.password.join(', '));
      }
    },
    [error],
  );

  return (
    <FormikTextField
      disabled={isLoading}
      label='Password'
      name='password'
      onResponseError={onResponseError}
      placeholder='Password'
      required
      size='small'
      type='password'
      variant='standard'
    />
  );
}
