import { render, screen } from '@testing-library/react';
import { IPageProps } from 'src/component/page-frame/IPageProps';
import { TaskNew } from 'src/page/TaskNew';

jest.mock('src/component', () => ({
  PageFrame: ({ children, title }: IPageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('TaskNew', () => {
  beforeEach(() => {
    render(<TaskNew />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is add new/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/Coming soon.../i);
  });
});
