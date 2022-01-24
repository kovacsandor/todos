import { render, screen } from '@testing-library/react';
import { PageNotFound } from 'src/component/PageNotFound';

describe('PageNotFound', () => {
  beforeEach(() => {
    render(<PageNotFound />);
  });

  test('renders page not found', () => {
    screen.getByText(/page not found/i);
  });
});
