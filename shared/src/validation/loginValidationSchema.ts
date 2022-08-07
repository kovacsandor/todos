import { object, string } from 'yup';

export const loginValidationSchema = object().shape({
  email: string().required().email().max(320),
  password: string().required().min(16).max(32),
});
