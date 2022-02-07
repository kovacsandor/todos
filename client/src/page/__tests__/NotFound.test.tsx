import { render, screen } from '@testing-library/react';
import { IPageProps } from 'src/component/page-frame/IPageProps';
import { NotFound } from 'src/page';

jest.mock('src/component', () => ({
  PageFrame: ({ children, title }: IPageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('NotFound', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is page not found/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/PageNotFound/i);
  });
});
