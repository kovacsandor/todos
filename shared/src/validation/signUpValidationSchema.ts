import { object, ref, string } from 'yup';

const passwordSchema = string().required().min(16).max(32);

export const signUpValidationSchema = object().shape({
  email: string().required().email().max(320),
  name: string().required().max(320),
  password: passwordSchema,
  passwordConfirmation: passwordSchema.oneOf([ref('password')]),
});
