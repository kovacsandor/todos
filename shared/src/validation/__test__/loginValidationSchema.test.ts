import { describe, expect, test } from '@jest/globals';
import { Login } from 'src/endpoint';
import { getError } from 'src/helper';
import { validateFields } from 'src/utility';
import { loginValidationSchema } from 'src/validation/loginValidationSchema';
import { ValidationError } from 'yup';

describe('loginValidationSchema', () => {
  test('value gets validated', async () => {
    const value: Login['requestBody'] = {
      email: 'john.doe@todos.com',
      password: '0123456789012345',
    };

    const error = await getError<ValidationError>(() => validateFields(value, loginValidationSchema));

    expect(error).toBeUndefined();
  });

  test('value gets rejected', async () => {
    const value: Login['requestBody'] = {
      email: 'notValidEmail',
      password: 'lessThanEnough',
    };

    const error = await getError<ValidationError>(() => validateFields(value, loginValidationSchema));

    expect(error.errors[0]).toBe('email must be a valid email');
    expect(error.errors[1]).toBe('password must be at least 16 characters');
  });
});
