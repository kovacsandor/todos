import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export function DatePicker({readOnly, label}: {readOnly?: boolean, label: string}) {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const variant = readOnly ? 'standard' : 'outlined'

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        disabled={readOnly}
        renderInput={(props) => <TextField {...props}  variant={variant} helperText={!readOnly && 'Must not be earlier than now'}/>}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
