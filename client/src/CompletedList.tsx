import React from 'react';
import List from '@mui/material/List';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { AppListItem } from './AppListItem';
import { DeleteConfirm } from './DeleteConfirm';
import { Divider, Typography } from '@mui/material';
import { ErrorNotif } from './ErrorNotif';
import { red, grey } from '@mui/material/colors';
import FormDialog from './FormDialog';

export function CompletedList() {

  return (
    <>
    {/* <FormDialog/> */}
    <Stack  mb={3}>
    <Stack  spacing={1}>
      <List>
        {/* <AppListItem
          status={'todo'}
          dueDate='Jan 2, 2023'
          loading={false}
          summary='Clean up'
          type='private'
          />
        <Divider sx={{color: grey[500]}}>FEBRUARY</Divider>
        <AppListItem
          status={'todo'}
          dueDate='Feb 7, 2023'
          loading={false}
          summary='Talk to Jane'
          type='work'
          />  */}
         {/* <AppListItem
          status={'todo'}
          dueDate='Feb 7, 2023'
          loading={true}
          summary='Talk to Jane'
          type='work'
          />  */}
         {/* <AppListItem
        failed={true}
          status={'todo'}
          dueDate='Feb 7, 2023'
          loading={false}
          summary='Talk to Jane'
          type='work'
          />  */}
         {/* <AppListItem
          status={'completed'}
          dueDate='Feb 7, 2023'
          loading={false}
          summary='Talk to Jane'
          type='work'
          />  */}
         <AppListItem
          status={'completed'}
          dueDate='Feb 7, 2023'
          loading={true}
          summary='Talk to Jane'
          type='work'
          />
        {/* <AppListItem
          status={'todo'}
          dueDate='Feb 19, 2023'
          loading={false}
          summary='Finish business planning'
          type='work'
        /> */}
      </List>

      {/* <Typography color={red[700]} variant="overline"  textAlign={'center'}>Failed to load tasks</Typography>
      <Divider/>
      <LoadingButton variant="text">Try again</LoadingButton > */}
      
      {/* <Typography  color={grey[700]} variant="overline"  textAlign={'center'}>No tasks found</Typography> */}

      {/* <Divider />
      <Typography  color={grey[700]} variant="overline"  textAlign={'center'}>No more tasks</Typography> */}

      <Divider/>
      <LoadingButton  variant="text">Load more</LoadingButton >

      {/* <Divider />
      <LoadingButton loading variant="text">Load more</LoadingButton > */}
      
    </Stack>
    </Stack>
    {/* <DeleteConfirm/> */}
    </>
  );
}
