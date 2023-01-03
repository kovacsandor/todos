import { describe, expect, test } from '@jest/globals';
import { app } from 'src/app';
import { mockKafkaSend } from 'src/helper';
import { userModel } from 'src/model';
import { getPayload, getValidationError, SignUp, StatusCode } from 'todos-shared';
import { KafkaTopic, SupertestResponse, testEndpoint } from 'todos-shared-microservices';

describe('signUp', () => {
  test('user can sign up', async () => {
    const requestBody: SignUp['requestBody'] = {
      email: 'john.doe@todos.com',
      name: 'John Doe',
      password: '0123456789012345',
      passwordConfirmation: '0123456789012345',
    };

    const response: SupertestResponse<SignUp['response']> = await testEndpoint<SignUp>(app, {
      method: 'post',
      path: '/api/user-service/sign-up',
      requestBody,
    });

    const payload = getPayload(response.body);

    expect(response.status).toBe(StatusCode.Created);
    expect(response.body.type).toBe('Success');
    expect(payload.token).toBeDefined();

    const document = await userModel.findOne({ email: requestBody.email });
    const user = document.toJSON();

    expect(document).toBeDefined();
    expect(document.id).toBe(user.id);
    expect(user.email).toBe(requestBody.email);
    expect(user.name).toBe(requestBody.name);
    expect(user.password).toBeDefined();
    expect(user.password).not.toBe(requestBody.password);

    expect(mockKafkaSend).toBeCalledWith({
      topic: KafkaTopic.UserSignedUp,
      messages: [
        {
          key: user.id,
          value: JSON.stringify({
            user: {
              email: requestBody.email,
              name: requestBody.name,
            },
          }),
        },
      ],
    });
  });

  test('user needs to send valid data', async () => {
    const requestBody: SignUp['requestBody'] = {
      email: 'badEmailAddress',
      name: 'John Doe',
      password: '0123456789012345',
      passwordConfirmation: '0123456789012345',
    };

    const response: SupertestResponse<SignUp['response']> = await testEndpoint<SignUp>(app, {
      method: 'post',
      path: '/api/user-service/sign-up',
      requestBody,
    });

    const error = getValidationError(response.body);

    expect(response.status).toBe(StatusCode.UnprocessableEntity);
    expect(response.body.type).toBe('ValidationError');
    expect(error.message).toBe('email must be a valid email');
  });

  test('user needs to send an unused email', async () => {
    const requestBody: SignUp['requestBody'] = {
      email: 'john.doe@todos.com',
      name: 'John Doe',
      password: '0123456789012345',
      passwordConfirmation: '0123456789012345',
    };

    await testEndpoint<SignUp>(app, {
      method: 'post',
      path: '/api/user-service/sign-up',
      requestBody,
    });

    const response: SupertestResponse<SignUp['response']> = await testEndpoint<SignUp>(app, {
      method: 'post',
      path: '/api/user-service/sign-up',
      requestBody,
    });

    const error = getValidationError(response.body);

    expect(response.status).toBe(StatusCode.BadRequest);
    expect(response.body.type).toBe('ValidationError');
    expect(error.message).toBe('Email is already taken');
  });
});
