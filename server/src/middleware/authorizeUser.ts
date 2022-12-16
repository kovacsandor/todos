import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { decode } from 'jwt-simple';
import { HttpError } from 'src/error';
import { JWTPayload } from 'src/type';
import { StatusCode, User } from 'todos-shared';

interface UnauthorizedLocals {
  user?: User;
}

export const authorizeUser =
  <
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = Query,
    Locals extends Record<string, any> = Record<string, any>,
  >(
    users: readonly User[],
  ) =>
  (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, UnauthorizedLocals>,
    next: NextFunction,
  ): void => {
    if (!req.headers.authorization) {
      throw new HttpError(StatusCode.Unauthorized, 'No authorization header found');
    }

    const { iat, sub }: JWTPayload = decode(req.headers.authorization, process.env.JWT_SECRET);

    const time = new Date().getTime();

    if (time - iat > 1000 * 60 * 60 * 24) {
      throw new HttpError(StatusCode.Unauthorized, 'Token is outdated');
    }

    const user = users.find((user) => user.id === sub);

    if (!user) {
      throw new HttpError(StatusCode.Unauthorized, 'User not found');
    }

    res.locals.user = user;

    next();
  };
