import { Task } from 'src/component';
import { ITaskListItemProps } from 'src/component/task-list/ITaskListItemProps';
import { TaskListDivider } from 'src/component/task-list/TaskListDivider';

export function TaskListItem({ curr, prev }: ITaskListItemProps): JSX.Element {
  return (
    <>
      <TaskListDivider curr={curr} prev={prev} />
      <Task task={curr} />
    </>
  );
}
