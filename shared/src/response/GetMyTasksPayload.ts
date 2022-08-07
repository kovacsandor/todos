import { TaskListItem } from 'src/type';

export type GetMyTasksPayload = {
  readonly tasks: readonly TaskListItem[];
};
