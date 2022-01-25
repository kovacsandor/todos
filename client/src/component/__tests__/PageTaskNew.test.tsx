import { render, screen } from '@testing-library/react';
import { PageTaskNew } from 'src/component/PageTaskNew';
import { PageProps } from 'src/component/Page/PageProps';

jest.mock('src/component/Page', () => ({
  Page: ({ children, title }: PageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('PageTaskNew', () => {
  beforeEach(() => {
    render(<PageTaskNew />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is add new/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/PageTaskNew/i);
  });
});
