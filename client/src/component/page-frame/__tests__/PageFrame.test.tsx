import { BoxProps } from '@mui/material/box';
import { ContainerProps } from '@mui/material/Container';
import { render, screen, within } from '@testing-library/react';
import { PageFrame } from 'src/component/page-frame';
import { IHeaderProps } from 'src/component/page-frame/IHeaderProps';

jest.mock('src/component/page-frame/Footer', () => ({
  Footer: () => <div>footer</div>,
}));

jest.mock('src/component/page-frame/Header', () => ({
  Header: ({ title }: IHeaderProps) => <div>header title is {title}</div>,
}));

jest.mock('@mui/material/Box', () => ({ children, sx }: BoxProps) => (
  <div>
    Box
    <div>sx is {JSON.stringify(sx)}</div>
    <div>{children}</div>
  </div>
));

jest.mock('@mui/material/Container', () => ({ children }: ContainerProps) => (
  <div>
    Container
    <div>{children}</div>
  </div>
));

describe('PageFrame', () => {
  const pageTitle = 'pageTitle';
  const pageChildren = 'pageChildren';

  beforeEach(() => {
    render(<PageFrame title={pageTitle}>{pageChildren}</PageFrame>);
  });

  test('footer is present', () => {
    screen.getAllByText(/footer/i);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/header title is pageTitle/i);
  });

  test('layout is configured correctly', () => {
    const box = screen.getByText(/box/i);
    const container = within(box).getByText(/container/i);
    within(box).getByText(/sx is \{"pb":7\}/i);
    within(container).getByText(pageChildren);
  });

  test('children are rendered', () => {
    screen.getAllByText(/container/i);
  });
});
