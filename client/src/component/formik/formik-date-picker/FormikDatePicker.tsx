import { TextFieldProps } from '@mui/material';
import { DatePickerProps } from '@mui/x-date-pickers';
import { useField } from 'formik';
import moment, { Moment } from 'moment';
import { useCallback, useEffect } from 'react';
import { DatePickerMui } from 'src/component/formik/formik-date-picker/DatePickerMui';

type Props = Omit<
  DatePickerProps<Moment, Moment>,
  'error' | 'helperText' | 'onBlur' | 'onChange' | 'renderInput' | 'value'
> &
  TextFieldProps & {
    readonly name: string;
    readonly onResponseError?: (setError: (value: string) => void) => void;
  };

export function FormikDatePicker({
  disabled,
  label,
  name,
  size,
  type,
  variant,
  onResponseError,
  ...rest
}: Props): JSX.Element {
  const [{ onBlur }, { error, touched, value }, { setError, setValue }] = useField<Date | null>(name);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setResponseError = useCallback(setError, []);

  useEffect(() => {
    onResponseError?.(setResponseError);
  }, [onResponseError, setResponseError]);

  const onDatePickerChange = (moment: Moment | null): void => {
    setValue(moment ? moment.toDate() : null);
  };

  return (
    <DatePickerMui
      {...rest}
      disabled={disabled}
      error={!!error && touched}
      helperText={touched ? error : ''}
      label={label}
      name={name}
      onBlur={onBlur}
      onChange={onDatePickerChange}
      size={size}
      type={type}
      variant={variant}
      value={moment(value)}
    />
  );
}
