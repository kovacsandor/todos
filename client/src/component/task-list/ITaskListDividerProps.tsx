import { TaskListItem } from 'todos-shared';

export interface ITaskListDividerProps {
  readonly curr: TaskListItem;
  readonly prev: TaskListItem | undefined;
}
