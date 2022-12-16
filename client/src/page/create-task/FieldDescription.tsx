import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { FormikTextField } from 'src/component';
import { CreateTask } from 'todos-shared';

type Props = {
  readonly error: AxiosError<CreateTask['response'], CreateTask['requestBody']> | null;
  readonly isLoading: boolean;
};

export function FieldDescription({ error, isLoading }: Props): JSX.Element {
  const onResponseError = useCallback(
    (setError: (value: string) => void): void => {
      if (error?.response?.data.type === 'ValidationError' && error.response.data.validation.description) {
        setError(error.response.data.validation.description.join(', '));
      }
    },
    [error],
  );

  return (
    <FormikTextField
      disabled={isLoading}
      label='Description'
      multiline
      name='description'
      onResponseError={onResponseError}
      size='small'
      type='text'
      variant='standard'
    />
  );
}
