import { CreateTask } from 'todos-shared';

export type FormikValues = Omit<CreateTask['requestBody'], 'dueDate'> & DueDate;

type DueDate = {
  readonly [K in keyof Pick<CreateTask['requestBody'], 'dueDate'>]: Date | null;
};
