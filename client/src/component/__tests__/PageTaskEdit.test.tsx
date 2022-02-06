import { render, screen } from '@testing-library/react';
import { IPageProps } from 'src/component/Page/IPageProps';
import { PageTaskEdit } from 'src/component/PageTaskEdit';

jest.mock('src/component/Page', () => ({
  Page: ({ children, title }: IPageProps) => (
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
