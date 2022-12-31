import { TaskCompletePayload } from 'src/response/TaskCompletePayload';
import { Endpoint, ServerResponseValidation } from 'src/type';

export type CompleteTask = Endpoint<'put', Params, '/api/task-service/complete/:taskId', Request, Response>;

type Params = {
  readonly taskId: string;
};

type Request = Record<string, never>;
type Response = ServerResponseValidation<TaskCompletePayload, Request>;
