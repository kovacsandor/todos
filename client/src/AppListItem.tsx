import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import { CircularProgress, IconButton, ListItemIcon, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorIcon from '@mui/icons-material/Error';
import { purple, teal, red } from '@mui/material/colors';

interface IProps {
  failed?: boolean
  loading?: boolean
  status: 'todo' | 'completed'
  summary: string
  dueDate?: string
  type: 'private' | 'work'
}

export function AppListItem({
  failed,
  status,
  loading,
  summary,
  dueDate,
  type,
}: IProps) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton disabled={loading} onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {
                status === 'todo' &&
                <MenuItem    onClick={handleClose}>
                  <ListItemIcon>   
                  {failed ? <RefreshIcon    fontSize="small"  /> : <CheckIcon fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText>   Complete{failed && ' - try again'}</ListItemText>
                </MenuItem>
              }
              {
                status === 'completed'
                &&
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <UndoOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Reopen</ListItemText>
                </MenuItem>
              }
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove</ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
        disablePadding
      >
        <ListItemButton disabled={loading} role={undefined}>
          <ListItemIcon>
            <ListItemAvatar>
              <Avatar  sx={{ bgcolor: type === 'work' ? purple[200] : teal[300] }}>
                {type === 'private' && <HomeIcon />}
                {type === 'work' && <WorkIcon />}
              </Avatar>
            </ListItemAvatar>
          </ListItemIcon>
          <ListItemText primaryTypographyProps={failed ?  {sx: {color: red[700] }} : undefined} primary={<Stack direction="row" spacing={1} alignItems='center'>
            <span>{summary}</span>
            {(status === 'completed' && !failed) && <CheckCircleIcon color='success' fontSize='inherit' />}
            {failed && <ErrorIcon color='error' fontSize='inherit' />}
          </Stack>} secondary={failed ? 'Failed to complete task' : dueDate} secondaryTypographyProps={failed ?  {sx: {color: red[700] }} : undefined} />
        </ListItemButton>
        {
          loading && (
            <CircularProgress
              sx={{
                position: 'absolute',
                top: '50%',
                left: '0%',
                marginTop: '-20px',
                marginLeft: '16px',
              }}
            />
          )
        }
      </ListItem>
    </>
  );
}
