import { beforeEach, describe, expect, test } from '@jest/globals';
import { app } from 'src/app';
import { getPayload, getValidationError, Login, SignUp, StatusCode } from 'todos-shared';
import { SupertestResponse, testEndpoint } from 'todos-shared-microservices';

describe('logIn', () => {
  const email = 'john.doe@todos.com';
  const password = '0123456789012345';

  beforeEach(async () => {
    await testEndpoint<SignUp>(app, {
      method: 'post',
      path: '/api/user-service/sign-up',
      requestBody: {
        email,
        name: 'John Doe',
        password,
        passwordConfirmation: password,
      },
    });
  });

  test('user can log in', async () => {
    const response: SupertestResponse<Login['response']> = await testEndpoint<Login>(app, {
      method: 'post',
      path: '/api/user-service/login',
      requestBody: {
        email,
        password,
      },
    });

    const payload = getPayload(response.body);

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.token).toBeDefined();
  });

  test('user needs to send existing email', async () => {
    const response: SupertestResponse<Login['response']> = await testEndpoint<Login>(app, {
      method: 'post',
      path: '/api/user-service/login',
      requestBody: {
        email: 'jane.doe@todos.com',
        password,
      },
    });

    const error = getValidationError(response.body);

    expect(response.status).toBe(StatusCode.NotFound);
    expect(response.body.type).toBe('ValidationError');
    expect(error.message).toBe('User not found');
    expect(error.validation.email).toEqual(['User not found']);
  });

  test('user needs to send correct password', async () => {
    const response: SupertestResponse<Login['response']> = await testEndpoint<Login>(app, {
      method: 'post',
      path: '/api/user-service/login',
      requestBody: {
        email,
        password: 'incorrectPassword',
      },
    });

    const error = getValidationError(response.body);

    expect(response.status).toBe(StatusCode.Forbidden);
    expect(response.body.type).toBe('ValidationError');
    expect(error.message).toBe('Incorrect password');
    expect(error.validation.password).toEqual(['Incorrect password']);
  });
});
