import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { FormikTextField } from 'src/component';
import { SignUp } from 'todos-shared';

type Props = {
  readonly error: AxiosError<SignUp['response'], SignUp['requestBody']> | null;
  readonly isLoading: boolean;
};

export function FieldPasswordConfirmation({ error, isLoading }: Props): JSX.Element {
  const onResponseError = useCallback(
    (setError: (value: string) => void): void => {
      if (error?.response?.data.type === 'ValidationError' && error.response.data.validation.passwordConfirmation) {
        setError(error.response.data.validation.passwordConfirmation.join(', '));
      }
    },
    [error],
  );

  return (
    <FormikTextField
      disabled={isLoading}
      onResponseError={onResponseError}
      label='Password confirmation'
      name='passwordConfirmation'
      required
      size='small'
      type='password'
      variant='standard'
    />
  );
}
