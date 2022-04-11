import { ITask } from 'src/type';

export interface ITaskListDividerProps {
  readonly curr: Omit<ITask, 'createdOn'>;
  readonly prev: Omit<ITask, 'createdOn'> | undefined;
}
