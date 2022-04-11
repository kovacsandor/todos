import { ITask } from 'src/type';

export interface ITaskListItemProps {
  readonly curr: Omit<ITask, 'createdOn'>;
  readonly prev: Omit<ITask, 'createdOn'> | undefined;
}
