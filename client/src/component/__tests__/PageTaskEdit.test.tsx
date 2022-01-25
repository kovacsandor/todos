import { render, screen } from '@testing-library/react';
import { PageTaskEdit } from 'src/component/PageTaskEdit';
import { PageProps } from 'src/component/Page/PageProps';

jest.mock('src/component/Page', () => ({
  Page: ({ children, title }: PageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('PageTaskEdit', () => {
  beforeEach(() => {
    render(<PageTaskEdit />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is edit task/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/PageTaskEdit/i);
  });
});
