import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';
import { useCallback, useEffect } from 'react';

type Props = TextFieldProps & {
  readonly name: string;
  readonly onResponseError?: (setError: (value: string) => void) => void;
};

export function FormikTextField({ name, onResponseError, ...rest }: Props): JSX.Element {
  const [{ onBlur, onChange }, { error, touched }, { setError }] = useField<string>(name);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setResponseError = useCallback(setError, []);

  useEffect(() => {
    onResponseError?.(setResponseError);
  }, [onResponseError, setResponseError]);

  return (
    <TextField
      {...rest}
      error={!!error && touched}
      helperText={touched ? error : ''}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}
