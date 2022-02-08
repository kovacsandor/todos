import { ITask } from 'src/type';

export interface ITaskProps {
  readonly task: Pick<ITask, 'dueDate' | 'type' | 'summary'>;
}
