import { GetCompletedTasksPayload } from 'src/response';
import { Endpoint, ServerResponse } from 'src/type';

export type GetCompletedTasks = Endpoint<
  'get',
  Params,
  '/api/task-service/completed-tasks/:from',
  Record<string, never>,
  Response
>;

type Params = {
  readonly from: string;
};

type Response = ServerResponse<GetCompletedTasksPayload>;
