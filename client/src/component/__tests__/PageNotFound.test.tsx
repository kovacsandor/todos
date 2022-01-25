import { render, screen } from '@testing-library/react';
import { PageNotFound } from 'src/component/PageNotFound';
import { PageProps } from 'src/component/Page/PageProps';

jest.mock('src/component/Page', () => ({
  Page: ({ children, title }: PageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('PageNotFound', () => {
  beforeEach(() => {
    render(<PageNotFound />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is page not found/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/PageNotFound/i);
  });
});
