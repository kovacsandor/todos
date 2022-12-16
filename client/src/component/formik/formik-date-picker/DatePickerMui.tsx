import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';

type Props = Omit<DatePickerProps<Moment, Moment>, 'renderInput'> & Omit<TextFieldProps, 'onChange'>;

export function DatePickerMui({
  disabled,
  error,
  helperText,
  label,
  name,
  onBlur,
  onChange,
  size,
  type,
  value,
  variant,
  ...rest
}: Props): JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        {...rest}
        disabled={disabled}
        label={label}
        OpenPickerButtonProps={{
          name: name,
          onBlur: onBlur as undefined,
        }}
        onChange={onChange}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...rest}
            {...params}
            error={error}
            helperText={helperText}
            name={name}
            onBlur={onBlur}
            size={size}
            type={type}
            variant={variant}
          />
        )}
        value={value}
      />
    </LocalizationProvider>
  );
}
