import { TaskCreatePayload } from 'src/response';
import { Endpoint, ServerResponseValidation, TaskPayload } from 'src/type';

export type CreateTask = Endpoint<'post', Record<string, never>, '/api/task', Request, Response>;

type Request = TaskPayload;

type Response = ServerResponseValidation<TaskCreatePayload, Request>;
