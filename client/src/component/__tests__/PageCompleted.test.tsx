import { render, screen } from '@testing-library/react';
import { PageCompleted } from 'src/component/PageCompleted';
import { PageProps } from 'src/component/Page/PageProps';

jest.mock('src/component/Page', () => ({
  Page: ({ children, title }: PageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('PageCompleted', () => {
  beforeEach(() => {
    render(<PageCompleted />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is completed/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/PageCompleted/i);
  });
});
