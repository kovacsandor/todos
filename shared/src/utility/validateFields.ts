import { AnySchema } from 'yup';

export const validateFields = async <T>(value: T, validationSchema: AnySchema): Promise<void> => {
  await validationSchema.validate(value, { abortEarly: false });
};
