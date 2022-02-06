import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import Avatar from '@mui/material/Avatar';
import purple from '@mui/material/colors/purple';
import teal from '@mui/material/colors/teal';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ITaskAvatarProps } from 'src/component/ITaskAvatarProps';

export function TaskAvatar({ type }: ITaskAvatarProps): JSX.Element {
  const colour = type === 'private' ? teal[300] : purple[200];

  return (
    <ListItemIcon>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: colour }}>
          {type === 'private' && <HomeIcon />}
          {type === 'work' && <WorkIcon />}
        </Avatar>
      </ListItemAvatar>
    </ListItemIcon>
  );
}
