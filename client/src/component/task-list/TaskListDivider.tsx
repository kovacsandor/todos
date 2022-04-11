import { Divider } from '@mui/material';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import { ITaskListDividerProps } from 'src/component/task-list/ITaskListDividerProps';

export function TaskListDivider({ curr, prev }: ITaskListDividerProps): JSX.Element {
  const currDueDate = moment(curr.dueDate);
  const prevDueDate = moment(prev?.dueDate);
  const dividerText =
    prevDueDate.year() !== currDueDate.year()
      ? currDueDate.format('YYYY')
      : currDueDate.format('MMMM').toLocaleUpperCase();

  const isVisible = !!prev && prevDueDate.month() !== currDueDate.month();

  return <>{isVisible && <Divider sx={{ color: grey[500] }}>{dividerText}</Divider>}</>;
}
