import { NextFunction, Request, Response, Router } from 'express';
import { taskModel } from 'src/model';
import { CreateTask, createTaskValidationSchema, StatusCode, validateFields } from 'todos-shared';
import { AuthorizedLocals, authorizeUser } from 'todos-shared-microservices';

const method: CreateTask['method'] = 'post';
const path: CreateTask['path'] = '/api/task-service/create';

export const createTask = Router();

createTask[method](
  path,
  authorizeUser,
  async (
    req: Request<{}, CreateTask['response'], CreateTask['requestBody']>,
    res: Response<CreateTask['response'], AuthorizedLocals>,
    next: NextFunction,
  ): Promise<void> => {
    validateFields(req.body, createTaskValidationSchema);

    const document = taskModel.createDocument({
      description: req.body.description,
      dueDate: new Date(req.body.dueDate),
      owner: res.locals.user.id,
      summary: req.body.summary,
      type: req.body.type,
    });

    const response = await document.save();

    const task = response.toJSON();

    res.status(StatusCode.Created).send({ payload: { task }, type: 'Success' });
  },
);
