import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SplitButton from './SplitButton';
import { purple, red, teal } from '@mui/material/colors';
import { DatePicker } from './DatePicker';
import { CircularProgress, Divider, Typography } from '@mui/material';
import ModalProgress from './ModalProgress';

interface IData {
  description: string
  name: string
}

export function AppAdd({edit, readOnly, data}: {edit?:boolean, readOnly?: boolean, data?: IData}) {

  const variant = readOnly ? 'standard' : 'outlined'

  return (
    <>
      <Stack spacing={2} mt={3} mb={3}>
        
      {/* <CircularProgress sx={{ position: 'relative', left: '50%', marginLeft: '-20px' }}/> */}
        {/* <TextField error id="outlined-basic" label="Summary" variant="outlined" helperText='Must be at least 3 characters' value='Ta'/> */}
        <TextField disabled={readOnly} id="outlined-basic" label="Summary" variant={variant} helperText={!readOnly && 'Must be at least 3 characters'} value={data?.name}/>
        <FormControl fullWidth  variant={variant}>
          <InputLabel  disabled={readOnly} id="demo-simple-select-label">Type</InputLabel>
          <Select
             disabled={readOnly}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data ? 'Work' : 'Private'}
            label="Type"
            renderValue={(a) => { console.log(a); return a }}
          >
            <MenuItem value={'Private'}>
              <ListItemIcon color={teal[300]}>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Private</ListItemText>
            </MenuItem>
            <MenuItem  value={'Work'}>
              <ListItemIcon  color={purple[200]}>
                <WorkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Work</ListItemText>
            </MenuItem>
          </Select>
        </FormControl>
        <TextField  disabled={readOnly} id="outlined-basic2" minRows={2} multiline label="Description" variant={variant} value={data?.description}/>
          <DatePicker label='Due date' readOnly={readOnly}/>
          {readOnly && <DatePicker label='Created' readOnly={readOnly}/>}
          {/* <Divider/>
          <Typography color={red[700]} variant="overline"  textAlign={'center'}>Failed to save task</Typography> */}
          <Divider/>
        <Stack direction="row" spacing={2} justifyContent='flex-end'>
          <Button>
            {edit ? 'Cancel' : 'Reset'}
          </Button>
          {/* <Button variant='contained'>
            Save
          </Button> */}
          {/* <SplitButton buttons='edit-fail'/> */}
          <SplitButton buttons='edit'/>
          {/* <SplitButton disabled buttons='edit'/> */}
          {/* <SplitButton buttons='new'/> */}
          {/* <SplitButton disabled buttons='new'/>
          <SplitButton buttons='completed'/>
          <SplitButton buttons='todo'/> */}
        </Stack>
      </Stack>
      <ModalProgress/>
    </>
  );
}
