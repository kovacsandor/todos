import { render, screen } from '@testing-library/react';
import { Page } from 'src/component/Page';
import { IHeaderProps } from 'src/component/Page/IHeaderProps';

jest.mock('src/component/Page/Footer', () => ({
  Footer: () => <div>footer</div>,
}));

jest.mock('src/component/Page/Header', () => ({
  Header: ({ title }: IHeaderProps) => <div>header title is {title}</div>,
}));

describe('Page', () => {
  const pageTitle = 'pageTitle';
  const pageChildren = 'pageChildren';

  beforeEach(() => {
    render(<Page title={pageTitle}>{pageChildren}</Page>);
  });

  test('footer is present', () => {
    screen.getAllByText(/footer/i);
  });

  test('header is configured correctly', () => {
    screen.getAllByText(/header title is pageTitle/i);
  });

  test('children are rendered', () => {
    screen.getAllByText(/pageChildren/i);
  });
});
