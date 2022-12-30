import { TaskCreatePayload } from 'src/response';
import { Endpoint, ServerResponseValidation, TaskPayload } from 'src/type';

export type CreateTask = Endpoint<'post', Record<string, never>, '/api/task-service/create', Request, Response>;

type Request = TaskPayload;

type Response = ServerResponseValidation<TaskCreatePayload, Request>;
