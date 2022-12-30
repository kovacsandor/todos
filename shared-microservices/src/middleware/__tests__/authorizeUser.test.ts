import { describe, expect, test } from '@jest/globals';
import { encode } from 'jwt-simple';
import { Types } from 'mongoose';
import { testMiddleware } from 'src/helper';
import { authorizeUser } from 'src/middleware/authorizeUser';
import { JWTPayload } from 'src/type';
import { StatusCode } from 'todos-shared';

describe('authorizeUser', () => {
  test('no authorization header found', async () => {
    const response = await testMiddleware({ middleware: authorizeUser });

    expect(response.status).toBe(StatusCode.Unauthorized);
    expect(response.text.includes('No authorization header found')).toBeTruthy();
    expect(response.text.includes('HttpError')).toBeTruthy();
  });

  test('token is outdated', async () => {
    const payload: JWTPayload = {
      iat: new Date('2022-12-15').getTime(),
      sub: new Types.ObjectId().toString(),
    };

    const authorization = encode(payload, process.env.JWT_SECRET);
    const response = await testMiddleware({ headers: { authorization }, middleware: authorizeUser });

    expect(response.status).toBe(StatusCode.Unauthorized);
    expect(response.text.includes('Token is outdated')).toBeTruthy();
    expect(response.text.includes('HttpError')).toBeTruthy();
  });

  test('user id is passed on to the next middleware', async () => {
    const userId = new Types.ObjectId().toString();

    const payload: JWTPayload = {
      iat: new Date().getTime(),
      sub: userId,
    };

    const authorization = encode(payload, process.env.JWT_SECRET);
    const response = await testMiddleware({
      headers: { authorization },
      middleware: authorizeUser,
      routeHandler: (req, res, next) => res.status(StatusCode.OK).send(res.locals.user.id),
    });

    expect(response.status).toBe(StatusCode.OK);
    expect(response.text).toBe(userId);
  });
});
