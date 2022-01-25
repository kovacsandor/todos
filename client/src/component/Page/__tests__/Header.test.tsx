import {
  AppBarProps,
  ToolbarProps,
  TypographyProps,
  TypographyTypeMap,
} from '@mui/material';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { render, screen, within } from '@testing-library/react';
import { ElementType } from 'react';
import { Header } from 'src/component/Page/Header';

jest.mock(
  '@mui/material/AppBar',
  () =>
    ({ children, position }: AppBarProps) =>
      (
        <div>
          AppBar component
          <div>AppBar is configured with position {position}</div>
          <div>{children}</div>
        </div>
      ),
);

jest.mock('@mui/material/Toolbar', () => ({ children }: ToolbarProps) => (
  <div>
    Toolbar component
    <div>{children}</div>
  </div>
));

jest.mock(
  '@mui/material/Typography',
  () =>
    ({
      children,
      component,
      sx,
      variant,
    }: OverrideProps<TypographyTypeMap, ElementType> & TypographyProps) =>
      (
        <div>
          Typography component
          <div>Typography is configured with component {component}</div>
          <div>Typography is configured with sx {JSON.stringify(sx)}</div>
          <div>Typography is configured with variant {variant}</div>
          <div>{children}</div>
        </div>
      ),
);

describe('Header', () => {
  const pageTitle = 'test page title';

  beforeEach(() => {
    render(<Header title={pageTitle} />);
  });

  test('page title is rendered', () => {
    const appBar = screen.getByText(/AppBar component/i);
    const toolbar = within(appBar).getByText(/Toolbar component/i);
    const typography = within(toolbar).getByText(/Typography component/i);
    within(typography).getByText(pageTitle);
  });

  test('AppBar is configured correctly', () => {
    const appBar = screen.getByText(/AppBar component/i);
    within(appBar).getByText(/AppBar is configured with position sticky/i);
  });

  test('Toolbar is configured correctly', () => {
    const appBar = screen.getByText(/AppBar component/i);
    within(appBar).getByText(/Toolbar component/i);
  });

  test('Typography is configured correctly', () => {
    const appBar = screen.getByText(/AppBar component/i);
    const toolbar = within(appBar).getByText(/Toolbar component/i);
    const typography = within(toolbar).getByText(/Typography component/i);
    within(typography).getByText(
      /Typography is configured with component div/i,
    );
    within(typography).getByText(
      /typography is configured with sx \{"flexgrow":1\}/i,
    );
    within(typography).getByText(/Typography is configured with variant h6/i);
  });
});
