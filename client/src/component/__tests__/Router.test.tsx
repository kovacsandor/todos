import { render, screen, within } from '@testing-library/react';
import { BrowserRouterProps, RouteProps, RoutesProps } from 'react-router-dom';
import { Router } from 'src/component/Router';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: BrowserRouterProps) => <>{children}</>,
  Route: ({ children, element, path }: RouteProps) => (
    <div>
      path is {path}$
      {element ? (
        <div>element is {element}</div>
      ) : (
        <div>route not configured</div>
      )}
      {children && <div>{children}</div>}
    </div>
  ),
  Routes: ({ children }: RoutesProps) => <>{children}</>,
}));

describe('Router', () => {
  beforeEach(() => {
    render(<Router />);
  });

  describe('every route is configured', () => {
    test('todos/my-tasks', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todos = within(root).getByText(/path is todos\$/i);
      const path = within(todos).getByText(/path is my-tasks\$/i);
      within(path).getByText(/element is my tasks/i);
    });

    test('todos/completed', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todos = within(root).getByText(/path is todos\$/i);
      const path = within(todos).getByText(/path is completed\$/i);
      within(path).getByText(/element is completed/i);
    });

    test('todo/new', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todo = within(root).getByText(/path is todo\$/i);
      const path = within(todo).getByText(/path is new\$/i);
      within(path).getByText(/element is add new task/i);
    });

    test('todo/edit/:id', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todo = within(root).getByText(/path is todo\$/i);
      const edit = within(todo).getByText(/path is edit\$/i);
      const path = within(edit).getByText(/path is :id\$/i);
      within(path).getByText(/element is edit task/i);
    });
  });

  test('no unnecessary route is configured', () => {
    const elements = screen.getAllByText(/route not configured/i);
    expect(elements).toHaveLength(4);
  });
});
