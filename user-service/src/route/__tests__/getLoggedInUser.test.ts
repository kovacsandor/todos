import { describe, expect, test } from '@jest/globals';
import { Types } from 'mongoose';
import { app } from 'src/app';
import { getHttpError, GetLoggedInUser, getPayload, SignUp, StatusCode } from 'todos-shared';
import { getJWT, SupertestResponse, testEndpoint } from 'todos-shared-microservices';

describe('getLoggedInUser', () => {
  test('user can get loggedInUser', async () => {
    const name = 'John Doe';

    const { body } = await testEndpoint<SignUp>(app, {
      method: 'post',
      path: '/api/user-service/sign-up',
      requestBody: {
        email: 'john.doe@todos.com',
        name,
        password: '0123456789012345',
        passwordConfirmation: '0123456789012345',
      },
    });

    const response: SupertestResponse<GetLoggedInUser['response']> = await testEndpoint<GetLoggedInUser>(
      app,
      {
        method: 'get',
        path: '/api/user-service/logged-in-user',
      },
      { authorization: body.type === 'Success' ? body.payload.token : null },
    );

    const payload = getPayload(response.body);

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.loggedInUser.name).toBe(name);
  });

  test('user gets rejected with a non-existent user id', async () => {
    await testEndpoint<SignUp>(app, {
      method: 'post',
      path: '/api/user-service/sign-up',
      requestBody: {
        email: 'john.doe@todos.com',
        name: 'John Doe',
        password: '0123456789012345',
        passwordConfirmation: '0123456789012345',
      },
    });

    const nonExistentUserId = new Types.ObjectId();
    const authorization = getJWT(nonExistentUserId.toString());

    const response: SupertestResponse<GetLoggedInUser['response']> = await testEndpoint<GetLoggedInUser>(
      app,
      {
        method: 'get',
        path: '/api/user-service/logged-in-user',
      },
      { authorization },
    );

    const error = getHttpError(response.body);

    expect(response.status).toBe(StatusCode.Unauthorized);
    expect(response.body.type).toBe('HttpError');
    expect(error.message).toBe('User not found');
  });
});
