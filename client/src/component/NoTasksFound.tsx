import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

export function NoTasksFound(): JSX.Element {
  return (
    <Typography color={grey[700]} variant='overline' textAlign='center' mt='16px'>
      No tasks found
    </Typography>
  );
}
