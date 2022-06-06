import { TypographyProps } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { TaskListMessage } from 'src/component/task-list-message/TaskListMessage';

jest.mock('@mui/material/Typography', () => ({ children, color, mt, textAlign, variant }: TypographyProps) => (
  <div>
    Typography
    <div>color is {color}</div>
    <div>mt is {mt}</div>
    <div>textAlign is {textAlign}</div>
    <div>variant is {variant}</div>
    <div>{children}</div>
  </div>
));

jest.mock('@mui/material/colors/grey', () => ({
  700: '#616161',
}));

jest.mock('@mui/material/colors/red', () => ({
  700: '#d32f2f',
}));

describe('TaskListMessage', () => {
  describe('has no error', () => {
    beforeEach(() => {
      render(<TaskListMessage text='test' />);
    });

    test('typography is configured correctly', () => {
      screen.getByText(/color is #616161/i);
      screen.getByText(/mt is 16px/i);
      screen.getByText(/textAlign is center/i);
      screen.getByText(/variant is overline/i);
      screen.getByText(/test/i);
    });
  });

  describe('has error', () => {
    beforeEach(() => {
      render(<TaskListMessage error text='test' />);
    });

    test('typography is configured correctly', () => {
      screen.getByText(/color is #d32f2f/i);
    });
  });
});
