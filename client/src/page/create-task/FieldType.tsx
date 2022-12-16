import { Home, Work } from '@mui/icons-material';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { FormikSelect, Item } from 'src/component';
import { CreateTask } from 'todos-shared';

type Props = {
  readonly error: AxiosError<CreateTask['response'], CreateTask['requestBody']> | null;
  readonly isLoading: boolean;
};

export function FieldType({ error, isLoading }: Props): JSX.Element {
  const onResponseError = useCallback(
    (setError: (value: string) => void): void => {
      if (error?.response?.data.type === 'ValidationError' && error.response.data.validation.type) {
        setError(error.response.data.validation.type.join(', '));
      }
    },
    [error],
  );

  const menuItems: readonly Item<CreateTask['requestBody']['type']>[] = [
    {
      icon: <Home />,
      key: 'private',
      label: 'Private',
      value: 'private',
    },
    {
      icon: <Work />,
      key: 'work',
      label: 'Work',
      value: 'work',
    },
  ];

  return (
    <FormikSelect
      disabled={isLoading}
      label='Type'
      multiline
      name='type'
      onResponseError={onResponseError}
      size='small'
      variant='standard'
      menuItems={menuItems}
    />
  );
}
