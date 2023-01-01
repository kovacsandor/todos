import { QueryKey } from 'src/type';
import { TaskListItem } from 'todos-shared';

export interface ITaskListProps {
  readonly fetchTasks: (from: number) => Promise<readonly TaskListItem[]>;
  readonly queryKey: QueryKey;
}
