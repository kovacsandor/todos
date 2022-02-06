import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { generateTasks } from './generateTasks';
import { getParamFrom } from './getParamFrom';
import { getTasksTodo } from './getTasksTodo';
import { ITask } from './ITask';

interface IResponseGetTodosMyTasks {
  readonly tasks: readonly Omit<ITask, 'createdOn'>[];
}

interface IRequestParamsGetTodosMyTasks {
  readonly from: string;
}

const tasks: ITask[] = generateTasks();

const application: Express = express();
const port: number = 8080;

application.use(cors());

application.get(
  '/api/todos/my-tasks/:from',
  (req: Request<IRequestParamsGetTodosMyTasks>, res: Response<IResponseGetTodosMyTasks>, next: NextFunction): void => {
    const from = getParamFrom(req.params.from);

    res.send({
      tasks: getTasksTodo(tasks, from),
    });
  },
);

application.listen(port, (): void => {
  console.log(`Listening at http://localhost:${port}`);
});
