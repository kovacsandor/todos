import { Express, NextFunction, Request, Response } from 'express';
import { HttpError } from 'src/error';
import { authorizeUser } from 'src/middleware';
import { AuthorizedLocals } from 'src/type';
import { GetMyTasks, StatusCode, Task, TaskListItem, User } from 'todos-shared';

const method: GetMyTasks['method'] = 'get';
const path: GetMyTasks['path'] = '/api/todos/my-tasks/:from';

export const getMyTasks = (application: Express, tasks: readonly Task[], users: readonly User[]) => {
  application[method](
    path,
    authorizeUser(users),
    (
      req: Request<GetMyTasks['requestBody']>,
      res: Response<GetMyTasks['response'], AuthorizedLocals>,
      next: NextFunction,
    ): void => {
      const from = Number(req.params.from);

      if (typeof from !== 'number' || Number.isNaN(from)) {
        throw new HttpError(StatusCode.BadRequest, 'Incorrect query parameter');
      }

      const getTasksTodo = (): readonly TaskListItem[] => {
        return tasks
          .filter(({ owner }: Task): boolean => owner === res.locals.user.id)
          .filter(({ status }: Task): boolean => status === 'todo')
          .sort((a: Task, b: Task) => a.dueDate - b.dueDate)
          .slice(from, from + 10)
          .map(({ createdOn, owner, ...task }: Task): TaskListItem => task);
      };

      res.send({ payload: { tasks: getTasksTodo() }, type: 'Success' });
    },
  );
};
