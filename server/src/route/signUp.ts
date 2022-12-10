import { faker } from '@faker-js/faker';
import { Express, NextFunction, Request, Response } from 'express';
import { CustomValidationError } from 'src/error';
import { getJWT, validateFields } from 'src/helper';
import { SignUp, signUpValidationSchema, StatusCode, User } from 'todos-shared';

const method: SignUp['method'] = 'post';
const path: SignUp['path'] = '/api/sign-up';

export const signUp = (application: Express, users: User[]) => {
  application[method](
    path,
    (
      req: Request<{}, SignUp['response'], SignUp['requestBody']>,
      res: Response<SignUp['response']>,
      next: NextFunction,
    ): void => {
      validateFields(req.body, signUpValidationSchema);

      const existingUser = users.find((user) => user.email === req.body.email);

      if (!!existingUser) {
        throw new CustomValidationError(StatusCode.BadRequest, 'Email is already taken', req.body.email, 'email');
      }

      const user: User = {
        email: req.body.email,
        id: faker.database.mongodbObjectId(),
        name: req.body.name,
        password: req.body.password,
      };

      users.push(user);

      const token = getJWT(user.id);

      res.send({
        payload: { token },
        type: 'Success',
      });
    },
  );
};
