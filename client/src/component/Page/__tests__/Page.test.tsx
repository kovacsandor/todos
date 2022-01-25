import { render, screen } from '@testing-library/react';
import { HeaderProps } from 'src/component/Page/HeaderProps';
import { Page } from 'src/component/Page';

jest.mock('src/component/Page/Header', () => ({
  Header: ({ title }: HeaderProps) => (
    <div>
      <div>header title is {title}</div>
    </div>
  ),
}));

describe('Page', () => {
  const pageTitle = 'pageTitle';
  const pageChildren = 'pageChildren';

  beforeEach(() => {
    render(<Page title={pageTitle}>{pageChildren}</Page>);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/header title is pageTitle/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/pageChildren/i);
  });
});
