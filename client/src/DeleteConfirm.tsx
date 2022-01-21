import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import DeleteIcon from '@mui/icons-material/Delete';

export function DeleteConfirm() {

  return (
    <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete todo?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete todo "Talk to Jane"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary'> Cancel</Button>
          <Button variant='contained' autoFocus color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  );
}
