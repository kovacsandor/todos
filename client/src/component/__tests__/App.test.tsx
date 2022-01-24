import { render, screen } from '@testing-library/react';
import { App } from 'src/component/App';

jest.mock('src/component/Router', () => ({
  Router: () => <div>router</div>,
}));

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders router', () => {
    screen.getByText(/router/i);
  });
});
