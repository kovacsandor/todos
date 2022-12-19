import { Task } from 'src/type';

export type TaskPayload = Pick<Task, 'description' | 'summary' | 'type'> & DueDate;

type DueDate = {
  readonly [K in keyof Pick<Task, 'dueDate'>]: string;
};
