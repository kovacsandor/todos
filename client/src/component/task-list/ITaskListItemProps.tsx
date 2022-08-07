import { TaskListItem } from 'todos-shared';

export interface ITaskListItemProps {
  readonly curr: TaskListItem;
  readonly prev: TaskListItem | undefined;
}
