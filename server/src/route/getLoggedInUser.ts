import { Express, NextFunction, Request, Response } from 'express';
import { GetLoggedInUser, StatusCode, User } from 'todos-shared';
import { AuthorizedLocals, authorizeUser, HttpError } from 'todos-shared-microservices';

const method: GetLoggedInUser['method'] = 'get';
const path: GetLoggedInUser['path'] = '/api/logged-in-user';

export const getLoggedInUser = (application: Express, users: readonly User[]) => {
  application[method](
    path,
    authorizeUser,
    (req: Request, res: Response<GetLoggedInUser['response'], AuthorizedLocals>, next: NextFunction): void => {
      const loggedInUser: User | undefined = users.find((user) => user.id === res.locals.user.id);

      if (!loggedInUser) {
        throw new HttpError(StatusCode.Unauthorized, 'User not found');
      }

      res.send({ payload: { loggedInUser: { name: loggedInUser.name } }, type: 'Success' });
    },
  );
};
