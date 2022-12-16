import { Task } from 'src/type';

export type TaskPayload = Pick<Task, 'description' | 'dueDate' | 'summary' | 'type'>;
