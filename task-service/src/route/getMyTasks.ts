import { NextFunction, Request, Response, Router } from 'express';
import { GetMyTasks, StatusCode, Task, TaskListItem } from 'todos-shared';
import { AuthorizedLocals, authorizeUser, HttpError, SortArgument, taskModel } from 'todos-shared-microservices';

const method: GetMyTasks['method'] = 'get';
const path: GetMyTasks['path'] = '/api/task-service/my-tasks/:from';

export const getMyTasks = Router();

getMyTasks[method](
  path,
  authorizeUser,
  async (
    req: Request<GetMyTasks['params']>,
    res: Response<GetMyTasks['response'], AuthorizedLocals>,
    next: NextFunction,
  ): Promise<void> => {
    const from = Number(req.params.from);

    if (typeof from !== 'number' || Number.isNaN(from)) {
      return next(new HttpError(StatusCode.BadRequest, 'Incorrect query parameter'));
    }

    const query: Pick<Task, 'owner' | 'status'> = {
      owner: res.locals.user.id,
      status: 'todo',
    };

    const sortArgument: SortArgument<Task> = {
      dueDate: 1,
    };

    const tasks: readonly TaskListItem[] = await taskModel
      .find(query)
      .sort(sortArgument)
      .skip(from)
      .limit(10)
      .transform((documents): readonly TaskListItem[] => {
        const tasks = documents.map((document) => {
          const { createdOn, owner, ...task } = document.toJSON();
          return task;
        });

        return tasks;
      });

    res.status(StatusCode.OK).send({ payload: { tasks }, type: 'Success' });
  },
);
