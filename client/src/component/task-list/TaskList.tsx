import List from '@mui/material/List';
import { ITaskListProps } from 'src/component/task-list/ITaskListProps';
import { TaskListItem } from 'src/component/task-list/TaskListItem';
import Shared from 'todos-shared';

export function TaskList({ tasks }: ITaskListProps): JSX.Element {
  return (
    <List>
      {tasks.reduce((acc: JSX.Element[], curr: Shared.TaskListItem, i: number): JSX.Element[] => {
        const prev = tasks.find((item: Shared.TaskListItem, j: number) => j === i - 1);
        return [...acc, <TaskListItem curr={curr} key={curr.id} prev={prev} />];
      }, [])}
    </List>
  );
}
