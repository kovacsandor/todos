import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { ObjectID } from 'bson';
import { ReactNode, useState } from 'react';
import { Item } from 'src/component/formik/formik-select/Item';
import { ItemValue } from 'src/component/formik/formik-select/ItemValue';

type Props<T extends ItemValue> = Omit<SelectProps<T>, 'defaultValue' | 'labelId'> & {
  readonly helperText?: string;
  readonly menuItems: readonly Item<T>[];
};

export function SelectMui<T extends ItemValue>({
  helperText,
  id,
  label,
  menuItems,
  onBlur,
  onChange,
  value,
  variant,
  name,
  ...rest
}: Props<T>): JSX.Element {
  const [labelId] = useState(new ObjectID().toString());
  const getMenuItemByValue = (value: T): Item<T> | undefined => {
    return menuItems.find((menuItem) => menuItem.value === value);
  };

  return (
    <div>
      <FormControl variant={variant} fullWidth>
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <Select
          {...rest}
          labelId={labelId}
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          renderValue={(value: T): ReactNode => {
            const menuItem = getMenuItemByValue(value);

            if (menuItem) {
              return menuItem.label;
            }

            return value;
          }}
        >
          {menuItems.map((menuItem) => (
            <MenuItem key={menuItem.key} value={menuItem.value}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText>{menuItem.label}</ListItemText>
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
}
