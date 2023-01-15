import { compare } from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import { Login, loginValidationSchema, StatusCode, validateFields } from 'todos-shared';
import { CustomValidationError, getJWT, userModel } from 'todos-shared-microservices';

const method: Login['method'] = 'post';
const path: Login['path'] = '/api/user-service/login';

export const logIn = Router();

logIn[method](
  path,
  async (
    req: Request<{}, Login['response'], Login['requestBody']>,
    res: Response<Login['response']>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await validateFields(req.body, loginValidationSchema);
    } catch (validationError) {
      return next(validationError);
    }

    const document = await userModel.findOne({
      email: req.body.email,
    });

    if (!document) {
      return next(new CustomValidationError(StatusCode.NotFound, 'User not found', req.body.email, 'email'));
    }

    const user = document.toJSON();

    const match = await compare(req.body.password, user.password);

    if (!match) {
      return next(new CustomValidationError(StatusCode.Forbidden, 'Incorrect password', req.body.password, 'password'));
    }

    const token = getJWT(user.id);

    res.status(StatusCode.OK).send({
      payload: { token },
      type: 'Success',
    });
  },
);
