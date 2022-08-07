import { Express, NextFunction, Request, Response } from 'express';
import { encode } from 'jwt-simple';
import { CustomValidationError } from 'src/error';
import { validateFields } from 'src/helper';
import { JWTPayload } from 'src/type';
import { Login, loginValidationSchema, StatusCode, User } from 'todos-shared';

const method: Login['method'] = 'post';
const path: Login['path'] = '/api/login';

export const logIn = (application: Express, users: readonly User[]) => {
  application[method](
    path,
    (
      req: Request<{}, Login['response'], Login['requestBody']>,
      res: Response<Login['response']>,
      next: NextFunction,
    ): void => {
      validateFields(req.body, loginValidationSchema);

      const user = users.find((user) => user.email === req.body.email);

      if (!user) {
        throw new CustomValidationError(StatusCode.NotFound, 'User not found', req.body.email, 'email');
      }

      if (user.password !== req.body.password) {
        throw new CustomValidationError(StatusCode.Forbidden, 'Incorrect password', req.body.password, 'password');
      }

      const payload: JWTPayload = {
        iat: new Date().getTime(),
        sub: user.id,
      };

      const token = encode(payload, process.env.JWT_SECRET);

      res.send({
        payload: { token },
        type: 'Success',
      });
    },
  );
};
