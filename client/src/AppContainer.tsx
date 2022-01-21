import React, { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import RestoreIcon from '@mui/icons-material/Restore';

interface iProps {
  children: ReactNode
  title: string
  index?: number
}

export function AppContainer({ children, title, index }: iProps) {

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ pb: 7 }}>
        <Container>
          {children}
        </Container>
      </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={index}
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
        >
          <BottomNavigationAction label="My tasks" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Add new" icon={<AddIcon />} />
          <BottomNavigationAction label="Completed" icon={<CheckIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
