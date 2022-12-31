import { Task } from 'todos-shared';

export interface ITaskMenuProps {
  readonly task: Pick<Task, 'id' | 'status'>;
}
