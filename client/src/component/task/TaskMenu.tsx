import { MoreVert } from '@mui/icons-material';
import Check from '@mui/icons-material/Check';
import { CircularProgress, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useEffect, useState } from 'react';
import { completeTask } from 'src/component/task/completeTask';
import { ITaskMenuProps } from 'src/component/task/ITaskMenuProps';
import { QueryKey } from 'src/type';

export function TaskMenu({ task }: ITaskMenuProps): JSX.Element {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onComplete = () => {
    mutate(task.id);
  };

  const { isLoading, mutate, data, isSuccess } = useMutation(completeTask);

  const fetching = queryClient.getQueryState([QueryKey.MyTasks])?.fetchStatus === 'fetching';

  const disabled = isLoading || fetching;

  useEffect(() => {
    if (isSuccess && data.type === 'Success') {
      queryClient.refetchQueries([QueryKey.MyTasks]);
      onClose();
    }
  }, [data, isSuccess]);

  return task.status === 'todo' ? (
    <>
      <IconButton disabled={disabled} onClick={onClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled={disabled} onClick={onComplete}>
          <ListItemIcon>
            {isLoading ? <CircularProgress size={20} color='inherit' /> : <Check fontSize='small' />}
          </ListItemIcon>
          <ListItemText>Complete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <></>
  );
}
