import { Task } from 'todos-shared';

export interface ITaskProps {
  readonly task: Pick<Task, 'dueDate' | 'id' | 'type' | 'status' | 'summary'>;
}
