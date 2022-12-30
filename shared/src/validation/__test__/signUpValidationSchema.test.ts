import { describe, expect, test } from '@jest/globals';
import { SignUp } from 'src/endpoint';
import { getError } from 'src/helper';
import { validateFields } from 'src/utility';
import { signUpValidationSchema } from 'src/validation/signUpValidationSchema';
import { ValidationError } from 'yup';

describe('signUpValidationSchema', () => {
  test('value gets validated', async () => {
    const value: SignUp['requestBody'] = {
      email: 'john.doe@todos.com',
      name: 'John Doe',
      password: '0123456789012345',
      passwordConfirmation: '0123456789012345',
    };

    const error = await getError<ValidationError>(() => validateFields(value, signUpValidationSchema));

    expect(error).toBeUndefined();
  });

  test('value gets rejected', async () => {
    const value: SignUp['requestBody'] = {
      email: 'notValidEmail',
      name: '',
      password: 'lessThanEnough',
      passwordConfirmation: 'confirmationDoesNotMatch',
    };

    const error = await getError<ValidationError>(() => validateFields(value, signUpValidationSchema));

    expect(error.errors[0]).toBe('email must be a valid email');
    expect(error.errors[1]).toBe('name is a required field');
    expect(error.errors[2]).toBe('passwordConfirmation must be one of the following values: Ref(password)');
    expect(error.errors[3]).toBe('password must be at least 16 characters');
  });
});
