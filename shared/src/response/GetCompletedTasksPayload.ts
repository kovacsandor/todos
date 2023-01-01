import { TaskListItem } from 'src/type';

export type GetCompletedTasksPayload = {
  readonly tasks: readonly TaskListItem[];
};
