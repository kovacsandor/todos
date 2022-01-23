import React, { Children, PropsWithChildren, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { App } from 'src/component/App';
import { mockComponent } from 'react-dom/test-utils';

jest.mock('src/component/Router', () => ({
  Router: () => <div>router</div>,
}));

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders router', () => {
    const element = screen.getByText(/router/i);
    expect(element).toBeInTheDocument();
  });
});
