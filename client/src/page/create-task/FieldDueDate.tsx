import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { FormikDatePicker } from 'src/component';
import { CreateTask } from 'todos-shared';

type Props = {
  readonly error: AxiosError<CreateTask['response'], CreateTask['requestBody']> | null;
  readonly isLoading: boolean;
};

export function FieldDueDate({ error, isLoading }: Props): JSX.Element {
  const onResponseError = useCallback(
    (setError: (value: string) => void): void => {
      if (error?.response?.data.type === 'ValidationError' && error.response.data.validation.dueDate) {
        setError(error.response.data.validation.dueDate.join(', '));
      }
    },
    [error],
  );

  return (
    <FormikDatePicker
      disabled={isLoading}
      label='Due date'
      name='dueDate'
      onResponseError={onResponseError}
      required
      size='small'
      type='text'
      variant='standard'
    />
  );
}
