import { faker } from '@faker-js/faker';
import { Express, NextFunction, Request, Response } from 'express';
import { authorizeUser } from 'src/middleware';
import { AuthorizedLocals } from 'src/type';
import { CreateTask, Task, User } from 'todos-shared';

const method: CreateTask['method'] = 'post';
const path: CreateTask['path'] = '/api/task';

export const createTask = (application: Express, users: readonly User[], tasks: Task[]) => {
  application[method](
    path,
    authorizeUser(users),
    (
      req: Request<{}, CreateTask['response'], CreateTask['requestBody']>,
      res: Response<CreateTask['response'], AuthorizedLocals>,
      next: NextFunction,
    ): void => {
      const task: Task = {
        createdOn: new Date().getMilliseconds(),
        description: req.body.description,
        dueDate: req.body.dueDate,
        id: faker.database.mongodbObjectId(),
        owner: res.locals.user.id,
        status: 'todo',
        summary: req.body.summary,
        type: req.body.type,
      };

      tasks.push(task);

      res.send({ payload: { task }, type: 'Success' });
    },
  );
};
