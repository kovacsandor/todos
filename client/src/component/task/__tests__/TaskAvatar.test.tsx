import { AvatarProps, ListItemAvatarProps, ListItemIconProps } from '@mui/material';
import { render, screen, within } from '@testing-library/react';
import { TaskAvatar } from 'src/component/task/TaskAvatar';

jest.mock('@mui/icons-material/Home', () => () => 'HomeIcon');

jest.mock('@mui/icons-material/Work', () => () => 'WorkIcon');

jest.mock('@mui/material/Avatar', () => ({ children, sx }: AvatarProps) => (
  <div>
    Avatar
    <div>{children}</div>
    <div>sx is {JSON.stringify(sx)}</div>
  </div>
));

jest.mock('@mui/material/colors/purple', () => ({ 200: '#ce93d8' }));

jest.mock('@mui/material/colors/teal', () => ({ 300: '#4db6ac' }));

jest.mock('@mui/material/ListItemAvatar', () => ({ children }: ListItemAvatarProps) => (
  <div>
    ListItemAvatar
    <div>{children}</div>
  </div>
));

jest.mock('@mui/material/ListItemIcon', () => ({ children }: ListItemIconProps) => (
  <div>
    ListItemIcon
    <div>{children}</div>
  </div>
));

describe('TaskAvatar', () => {
  describe('type is private', () => {
    beforeEach(() => {
      render(<TaskAvatar type='private' />);
    });

    test('structure is correct', () => {
      const listItemIcon = screen.getByText(/ListItemIcon/i);
      const listItemAvatar = within(listItemIcon).getByText(/ListItemAvatar/i);
      const avatar = within(listItemAvatar).getByText(/^Avatar$/i);
      within(avatar).getByText(/HomeIcon/i);
    });

    test('avatar is configured correctly', () => {
      screen.getByText(/sx is \{"bgcolor":"#4db6ac"\}/i);
    });

    describe('type is work', () => {
      beforeEach(() => {
        render(<TaskAvatar type='work' />);
      });

      test('avatar is configured correctly', () => {
        screen.getByText(/sx is \{"bgcolor":"#ce93d8"\}/i);
        screen.getByText(/WorkIcon/i);
      });
    });
  });
});
