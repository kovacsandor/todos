import { render, screen } from '@testing-library/react';
import { PageMyTasks } from 'src/component/PageMyTasks';
import { PageProps } from 'src/component/Page/PageProps';

jest.mock('src/component/Page', () => ({
  Page: ({ children, title }: PageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('PageMyTasks', () => {
  beforeEach(() => {
    render(<PageMyTasks />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is my tasks/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/PageMyTasks/i);
  });
});
