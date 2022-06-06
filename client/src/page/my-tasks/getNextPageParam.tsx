import { ITask } from 'src/type';

export function getNextPageParam(pageSize: number) {
  return (
    lastPage: readonly Omit<ITask, 'createdOn'>[],
    allPages: (readonly Omit<ITask, 'createdOn'>[])[],
  ): number | false => {
    return lastPage.length > pageSize - 1 && allPages.length;
  };
}
