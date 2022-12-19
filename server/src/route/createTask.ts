import { faker } from '@faker-js/faker';
import { Express, NextFunction, Request, Response } from 'express';
import { CreateTask, createTaskValidationSchema, Task, User } from 'todos-shared';
import { AuthorizedLocals, authorizeUser, validateFields } from 'todos-shared-microservices';

const method: CreateTask['method'] = 'post';
const path: CreateTask['path'] = '/api/task';

export const createTask = (application: Express, users: readonly User[], tasks: Task[]) => {
  application[method](
    path,
    authorizeUser,
    (
      req: Request<{}, CreateTask['response'], CreateTask['requestBody']>,
      res: Response<CreateTask['response'], AuthorizedLocals>,
      next: NextFunction,
    ): void => {
      validateFields(req.body, createTaskValidationSchema);

      const task: Task = {
        createdOn: new Date(),
        description: req.body.description,
        dueDate: new Date(req.body.dueDate),
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
