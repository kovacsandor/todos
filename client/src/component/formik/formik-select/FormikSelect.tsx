import { SelectChangeEvent, SelectProps } from '@mui/material';
import { useField } from 'formik';
import { FocusEvent, useCallback, useEffect } from 'react';
import { Item } from 'src/component/formik/formik-select/Item';
import { ItemValue } from 'src/component/formik/formik-select/ItemValue';
import { SelectMui } from 'src/component/formik/formik-select/SelectMui';

type Props<T extends ItemValue> = Omit<
  SelectProps,
  'value' | 'onBlur' | 'onChange' | 'error' | 'defaultValue' | 'labelId'
> & {
  readonly menuItems: readonly Item<T>[];
  readonly name: string;
  readonly onResponseError?: (setError: (value: string) => void) => void;
};

export function FormikSelect<T extends ItemValue>({
  disabled,
  label,
  name,
  onResponseError,
  ...rest
}: Props<T>): JSX.Element {
  const [, { error, touched, value }, { setError, setTouched, setValue }] = useField<ItemValue>(name);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setResponseError = useCallback(setError, []);

  useEffect(() => {
    onResponseError?.(setResponseError);
  }, [onResponseError, setResponseError]);

  const onSelectChange = (event: SelectChangeEvent<ItemValue>, child: React.ReactNode): void => {
    setValue(event.target.value);
  };

  const onBlur = (event: FocusEvent): void => {
    setTouched(true);
  };

  return (
    <SelectMui
      {...rest}
      disabled={disabled}
      error={!!error && touched}
      helperText={touched ? error : ''}
      label={label}
      onBlur={onBlur}
      onChange={onSelectChange}
      value={value}
    />
  );
}
