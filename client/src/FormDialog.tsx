import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SplitButton from './SplitButton';
import { AppAdd } from './AppAdd';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

export default function FormDialog() {

  return (
    <div>
      <Dialog open={true} fullWidth>
        <DialogTitle>Task details</DialogTitle>
        <DialogContent>
        <Typography sx={{display: 'inline-block', width: '100%'}} color={red[700]} variant="overline"  textAlign={'center'}>Failed to load task</Typography>
      {/* <CircularProgress sx={{ position: 'relative', left: '50%', marginLeft: '-20px' }}/> */}
            {/* <AppAdd readOnly={true} data={{name: 'Talk to Jane', description: '- deadlines must be kept\n- no parties in the office'}}/> */}
        </DialogContent>
        <DialogActions>
        <Stack direction="row" spacing={2} justifyContent='flex-end'>
        <Button >Cancel</Button>
        <Button variant='contained'>Try again</Button>
          {/* <SplitButton disabled buttons='todo'/> */}
        </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
