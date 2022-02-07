import { BottomNavigationProps } from '@mui/material/BottomNavigation';
import { BottomNavigationActionProps } from '@mui/material/BottomNavigationAction';
import { PaperTypeMap } from '@mui/material/Paper';
import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import { Footer } from 'src/component/page-frame/Footer';

const mockReact = React;
const mockNavigate = jest.fn();

jest.mock('@mui/icons-material/Add', () => () => 'add icon');
jest.mock('@mui/icons-material/Check', () => () => 'check icon');
jest.mock('@mui/icons-material/Restore', () => () => 'restore icon');
jest.mock(
  '@mui/material/BottomNavigation',
  () =>
    ({ children, onChange, showLabels, value }: BottomNavigationProps) => {
      const onClick = (index: number) => {
        return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
          onChange && onChange(event, index);
        };
      };

      return (
        <div>
          Bottom Navigation
          {showLabels && <div>show Labels</div>}
          <div>value is {value}</div>
          {mockReact.Children.map(
            children,
            (child, index) =>
              mockReact.isValidElement(child) && mockReact.cloneElement(child, { onClick: onClick(index) }),
          )}
        </div>
      );
    },
);
jest.mock('@mui/material/BottomNavigationAction', () => ({ icon, label, onClick }: BottomNavigationActionProps) => (
  <button onClick={onClick} type='button'>
    label is {label}
    <i>icon is {icon}</i>
  </button>
));
jest.mock('@mui/material/Paper', () => ({ children, elevation, sx }: PaperTypeMap['props']) => (
  <div>
    Paper
    <div>elevation is {elevation}</div>
    <div>sx is {JSON.stringify(sx)}</div>
    <div>{children}</div>
  </div>
));

jest.mock('react-router-dom', () => ({
  useNavigate: () => (route: string) => mockNavigate(route),
}));

jest.mock('src/component/page-frame/useGetRoute', () => ({
  useGetRoute: () => (value: number) => value,
}));

jest.mock('src/component/page-frame/useNavigationValue', () => ({
  useNavigationValue: () => 'navigation value',
}));

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  describe('layout', () => {
    test('is configured correctly', () => {
      const paper = screen.getByText(/paper/i);
      const bottomNavigation = within(paper).getByText(/bottom navigation/i);
      const actions = within(bottomNavigation).getAllByRole(/button/i);
      expect(actions).toHaveLength(3);
    });

    test('paper is correct', () => {
      screen.getByText(/elevation is 3/i);
      screen.getByText(/sx is \{"position":"fixed","bottom":0,"left":0,"right":0,"zindex":2\}/i);
    });

    test('bottom navigation is correct', () => {
      screen.getByText(/value is navigation value/i);
      screen.getByText(/show labels/i);
    });

    test('actions are correct', () => {
      const myTasks = screen.getByText(/label is my tasks/i);
      const addNew = screen.getByText(/label is add new/i);
      const completed = screen.getByText(/label is completed/i);
      within(myTasks).getByText(/icon is restore icon/i);
      within(addNew).getByText(/icon is add icon/i);
      within(completed).getByText(/icon is check icon/i);
    });
  });

  describe('navigation', () => {
    test('works for my tasks', () => {
      const myTasks = screen.getByText(/label is my tasks/i);
      fireEvent.click(myTasks);
      expect(mockNavigate).toBeCalledWith(0);
    });

    test('works for add new', () => {
      const myTasks = screen.getByText(/label is add new/i);
      fireEvent.click(myTasks);
      expect(mockNavigate).toBeCalledWith(1);
    });

    test('works for completed', () => {
      const myTasks = screen.getByText(/label is completed/i);
      fireEvent.click(myTasks);
      expect(mockNavigate).toBeCalledWith(2);
    });
  });
});
