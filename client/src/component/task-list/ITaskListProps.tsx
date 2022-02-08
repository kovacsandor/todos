import { ITask } from 'src/type';

export interface ITaskListProps {
  readonly tasks: readonly Omit<ITask, 'createdOn'>[];
}
