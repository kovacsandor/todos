import { NextFunction, Request, Response, Router } from 'express';
import { GetLoggedInUser, StatusCode, User } from 'todos-shared';
import { AuthorizedLocals, authorizeUser, HttpError, userModel } from 'todos-shared-microservices';

const method: GetLoggedInUser['method'] = 'get';
const path: GetLoggedInUser['path'] = '/api/user-service/logged-in-user';

export const getLoggedInUser = Router();

getLoggedInUser[method](
  path,
  authorizeUser,
  async (
    req: Request,
    res: Response<GetLoggedInUser['response'], AuthorizedLocals>,
    next: NextFunction,
  ): Promise<void> => {
    const loggedInUser: Pick<User, 'name'> | null = await userModel
      .findOne({
        _id: res.locals.user.id,
      })
      .transform((document): Pick<User, 'name'> => {
        if (document) {
          return {
            name: document.toJSON().name,
          };
        }
        return null;
      });

    if (!loggedInUser) {
      return next(new HttpError(StatusCode.Unauthorized, 'User not found'));
    }

    res.status(StatusCode.OK).send({ payload: { loggedInUser }, type: 'Success' });
  },
);
