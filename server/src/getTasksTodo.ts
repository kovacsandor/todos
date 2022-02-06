import { ITask } from './ITask';

export const getTasksTodo = (tasks: readonly ITask[], from: number): readonly Omit<ITask, 'createdOn'>[] => {
  return tasks
    .filter(({ status }: ITask): boolean => status === 'todo')
    .sort((a: ITask, b: ITask) => a.dueDate - b.dueDate)
    .slice(from, from + 10)
    .map(({ createdOn, ...task }: ITask): Omit<ITask, 'createdOn'> => task);
};
