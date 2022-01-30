import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import RestoreIcon from '@mui/icons-material/Restore';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { BaseSyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRoute } from 'src/component/Page/useGetRoute';
import { useNavigationValue } from 'src/component/Page/useNavigationValue';

export function Footer() {
  const navigate = useNavigate();
  const getRoute = useGetRoute();
  const value = useNavigationValue();

  const onChange = useCallback(
    (event: BaseSyntheticEvent, newValue: number): void => {
      const route = getRoute(newValue);
      navigate(route);
    },
    [getRoute, navigate],
  );

  return (
    <Paper
      elevation={3}
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
    >
      <BottomNavigation value={value} onChange={onChange} showLabels>
        <BottomNavigationAction label="My tasks" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Add new" icon={<AddIcon />} />
        <BottomNavigationAction label="Completed" icon={<CheckIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
