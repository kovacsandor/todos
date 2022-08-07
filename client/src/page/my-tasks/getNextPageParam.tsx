import { TaskListItem } from 'todos-shared';

export function getNextPageParam(pageSize: number) {
  return (lastPage: readonly TaskListItem[], allPages: (readonly TaskListItem[])[]): number | false => {
    return lastPage.length > pageSize - 1 && allPages.length;
  };
}
