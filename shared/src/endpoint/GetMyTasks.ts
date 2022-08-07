import { GetMyTasksPayload } from 'src/response';
import { Endpoint, ServerResponse } from 'src/type';

export type GetMyTasks = Endpoint<'get', Params, '/api/todos/my-tasks/:from', Record<string, never>, Response>;

type Params = {
  readonly from: string;
};

type Response = ServerResponse<GetMyTasksPayload>;
