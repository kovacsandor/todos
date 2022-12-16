import { Key } from 'react';
import { ItemValue } from 'src/component/formik/formik-select/ItemValue';

export type Item<T extends ItemValue> = {
  readonly icon: JSX.Element;
  readonly key: Key;
  readonly label: string;
  readonly value: T;
};
