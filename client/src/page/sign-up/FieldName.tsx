import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { FormikTextField } from 'src/component';
import { SignUp } from 'todos-shared';

type Props = {
  readonly error: AxiosError<SignUp['response'], SignUp['requestBody']> | null;
  readonly isLoading: boolean;
};

export function FieldName({ error, isLoading }: Props): JSX.Element {
  const onResponseError = useCallback(
    (setError: (value: string) => void): void => {
      if (error?.response?.data.type === 'ValidationError' && error.response.data.validation.name) {
        setError(error.response.data.validation.name.join(', '));
      }
    },
    [error],
  );

  return (
    <FormikTextField
      disabled={isLoading}
      onResponseError={onResponseError}
      label='Name'
      name='name'
      required
      size='small'
      type='text'
      variant='standard'
    />
  );
}
