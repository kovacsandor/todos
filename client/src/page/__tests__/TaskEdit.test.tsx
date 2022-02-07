import { render, screen } from '@testing-library/react';
import { IPageProps } from 'src/component/page-frame/IPageProps';
import { TaskEdit } from 'src/page';

jest.mock('src/component', () => ({
  PageFrame: ({ children, title }: IPageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('TaskEdit', () => {
  beforeEach(() => {
    render(<TaskEdit />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is edit task/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/PageTaskEdit/i);
  });
});
