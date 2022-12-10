import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { FormikTextField } from 'src/component';
import { SignUp } from 'todos-shared';

type Props = {
  readonly error: AxiosError<SignUp['response'], SignUp['requestBody']> | null;
  readonly isLoading: boolean;
};

export function FieldEmail({ error, isLoading }: Props): JSX.Element {
  const onResponseError = useCallback(
    (setError: (value: string) => void): void => {
      if (error?.response?.data.type === 'ValidationError' && error.response.data.validation.email) {
        setError(error.response.data.validation.email.join(', '));
      }
    },
    [error],
  );

  return (
    <FormikTextField
      disabled={isLoading}
      onResponseError={onResponseError}
      label='Email'
      name='email'
      required
      size='small'
      type='email'
      variant='standard'
    />
  );
}
