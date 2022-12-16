import { CreateTask } from 'todos-shared';

export type FormikValues = Omit<CreateTask['requestBody'], 'dueDate'> & {
  readonly dueDate: Date | null;
};
