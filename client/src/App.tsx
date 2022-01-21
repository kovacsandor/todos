import React from 'react';
import { AppContainer } from './AppContainer';
import { AppAdd } from './AppAdd';
import { AppList } from './AppList';
import { CompletedList } from './CompletedList';
import { grey } from '@mui/material/colors';
import { List, Stack, Typography } from '@mui/material';

export function App() {

  return (
    <>
      <AppContainer title={'My tasks'} index={0}>
        <AppList/>
      </AppContainer>
      {/* <AppContainer title={'Completed'} index={2}>
        <CompletedList/>
      </AppContainer> */}
      {/* <AppContainer title={'Add new'} index={1}>
        <AppAdd/>
      </AppContainer> */}
      {/* <AppContainer title={'Edit task'}>
        <AppAdd edit  data={{name: 'Talk to Jane', description: '- deadlines must be kept\n- no parties in the office'}}/>
      </AppContainer> */}
      {/* <AppContainer title={'404'}>
      <Stack >
           <List/>
      <Typography  color={grey[700]} variant="overline"  textAlign={'center'}>Page not found</Typography>
      </Stack>
      </AppContainer> */}
    </>
  );
}
