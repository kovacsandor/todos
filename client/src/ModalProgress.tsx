import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { positions } from '@mui/system';

export default function ModalProgress() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  React.useEffect(
      () => {
        setTimeout(() => {
            setOpen(true)
        }, 2000);
      },
      []
  )

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <LinearProgress sx={{position: 'relative', top: `100%`, marginTop: '-4px', outline: 'none'}}/>
      </Modal>
  );
  }