import { Task } from 'src/type';

export type TaskListItem = Omit<Task, 'createdOn' | 'owner'>;
