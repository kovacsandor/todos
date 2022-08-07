import { Express, NextFunction, Request, Response } from 'express';
import { authorizeUser } from 'src/middleware';
import { AuthorizedLocals } from 'src/type';
import { GetLoggedInUser, User } from 'todos-shared';

const method: GetLoggedInUser['method'] = 'get';
const path: GetLoggedInUser['path'] = '/api/logged-in-user';

export const getLoggedInUser = (application: Express, users: readonly User[]) => {
  application[method](
    path,
    authorizeUser(users),
    (req: Request, res: Response<GetLoggedInUser['response'], AuthorizedLocals>, next: NextFunction): void => {
      res.send({ payload: { loggedInUser: { name: res.locals.user.name } }, type: 'Success' });
    },
  );
};
