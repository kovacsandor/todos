import { AnySchema } from 'yup';

export const validateFields = <T>(value: T, validationSchema: AnySchema): void => {
  validationSchema.validateSync(value, { abortEarly: false });
};
