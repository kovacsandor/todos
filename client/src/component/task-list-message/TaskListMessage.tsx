import grey from '@mui/material/colors/grey';
import red from '@mui/material/colors/red';
import Typography from '@mui/material/Typography';
import { ITaskListMessageProps } from 'src/component/task-list-message/ITaskListMessageProps';

export function TaskListMessage({ error, text }: ITaskListMessageProps): JSX.Element {
  return (
    <Typography color={error ? red[700] : grey[700]} variant='overline' textAlign='center' mt='16px'>
      {text}
    </Typography>
  );
}
