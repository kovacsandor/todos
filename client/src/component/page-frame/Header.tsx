import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IHeaderProps } from 'src/component/page-frame/IHeaderProps';
import { LoggedInUser } from 'src/component/page-frame/LoggedInUser';

export function Header({ title }: IHeaderProps) {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <LoggedInUser />
      </Toolbar>
    </AppBar>
  );
}
