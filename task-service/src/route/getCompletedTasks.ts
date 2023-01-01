import { NextFunction, Request, Response, Router } from 'express';
import { taskModel } from 'src/model';
import { GetCompletedTasks, StatusCode, Task, TaskListItem } from 'todos-shared';
import { AuthorizedLocals, authorizeUser, HttpError, SortArgument } from 'todos-shared-microservices';

const method: GetCompletedTasks['method'] = 'get';
const path: GetCompletedTasks['path'] = '/api/task-service/completed-tasks/:from';

export const getCompletedTasks = Router();

getCompletedTasks[method](
  path,
  authorizeUser,
  async (
    req: Request<GetCompletedTasks['params']>,
    res: Response<GetCompletedTasks['response'], AuthorizedLocals>,
    next: NextFunction,
  ): Promise<void> => {
    const from = Number(req.params.from);

    if (typeof from !== 'number' || Number.isNaN(from)) {
      return next(new HttpError(StatusCode.BadRequest, 'Incorrect query parameter'));
    }

    const query: Pick<Task, 'owner' | 'status'> = {
      owner: res.locals.user.id,
      status: 'completed',
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
