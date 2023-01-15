import { NextFunction, Request, Response, Router } from 'express';
import { CompleteTask, StatusCode, Task } from 'todos-shared';
import { AuthorizedLocals, authorizeUser, HttpError, taskModel } from 'todos-shared-microservices';

const method: CompleteTask['method'] = 'put';
const path: CompleteTask['path'] = '/api/task-service/complete/:taskId';

export const completeTask = Router();

completeTask[method](
  path,
  authorizeUser,
  async (
    req: Request<CompleteTask['params'], CompleteTask['response'], CompleteTask['requestBody']>,
    res: Response<CompleteTask['response'], AuthorizedLocals>,
    next: NextFunction,
  ): Promise<void> => {
    const taskId = req.params.taskId;

    const document = await taskModel.findById(taskId);

    if (!document) {
      return next(new HttpError(StatusCode.NotFound, 'No task found with provided id'));
    }

    const task = document.toJSON();

    if (task.status === 'completed') {
      return next(new HttpError(StatusCode.UnprocessableEntity, 'Task is already completed'));
    }

    if (task.owner !== res.locals.user.id) {
      return next(new HttpError(StatusCode.Forbidden, 'User has no access rights to task'));
    }

    const update: Pick<Task, 'status'> = {
      status: 'completed',
    };

    const response = await taskModel.findByIdAndUpdate(taskId, update, {
      new: true,
    });

    res.status(StatusCode.OK).send({ payload: { task: response.toJSON() }, type: 'Success' });
  },
);
