import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export function ErrorNotif() {

  return (
    <Stack spacing={2} mb={3} sx={{ width: '100%' }}>
      <Snackbar message='sdfhjgh' open={true} autoHideDuration={6000} onClose={() => alert('close')}>
        <MuiAlert onClose={() => alert('close')} severity="error" sx={{ width: '100%', marginBottom: '56px' }}>This is an error message!</MuiAlert>
      </Snackbar>
     </Stack> 
  );
}
