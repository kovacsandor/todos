import { render, screen } from '@testing-library/react';
import { IPageProps } from 'src/component/Page/IPageProps';
import { PageTaskNew } from 'src/component/PageTaskNew';

jest.mock('src/component/Page', () => ({
  Page: ({ children, title }: IPageProps) => (
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
