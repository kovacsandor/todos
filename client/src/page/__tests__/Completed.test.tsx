import { render, screen } from '@testing-library/react';
import { IPageProps } from 'src/component/page-frame/IPageProps';
import { Completed } from 'src/page';

jest.mock('src/component', () => ({
  PageFrame: ({ children, title }: IPageProps) => (
    <div>
      <div>page title is {title}</div>
      <div>{children}</div>
    </div>
  ),
}));

describe('Completed', () => {
  beforeEach(() => {
    render(<Completed />);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/page title is completed/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/PageCompleted/i);
  });
});
