import { Task } from 'src/type';

export type TaskDetails = Pick<Task, 'description' | 'dueDate' | 'id' | 'status' | 'summary' | 'type'>;
