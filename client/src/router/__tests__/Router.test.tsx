import { render, screen, within } from '@testing-library/react';
import { BrowserRouterProps, RouteProps, RoutesProps } from 'react-router-dom';
import { Router } from 'src/router';
import { IRedirectProps } from 'src/router/IRedirectProps';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: BrowserRouterProps) => <>{children}</>,
  Route: ({ children, element, path, index }: RouteProps) => (
    <div>
      path is {path || `empty`}${element ? <div>element is {element}</div> : <div>route not configured</div>}
      {children && <div>{children}</div>}
      {index && <div>route is index</div>}
    </div>
  ),
  Routes: ({ children }: RoutesProps) => <div>routes{children}</div>,
}));

jest.mock('src/page', () => ({
  Completed: () => <>Page completed</>,
  LoginPage: () => <>Page add new task</>,
  MyTasks: () => <>Page my tasks</>,
  NotFound: () => <>Page Not Found</>,
  TaskEdit: () => <>Page edit task</>,
  TaskNew: () => <>Page add new task</>,
}));

jest.mock('src/router/Redirect', () => ({
  Redirect: ({ redirectFrom, redirectTo }: IRedirectProps) => (
    <>
      redirect
      <div>redirect from is {redirectFrom}$</div>
      <div>redirect to is {redirectTo}</div>
    </>
  ),
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
      within(path).getByText(/element is page my tasks/i);
    });

    test('todos/completed', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todos = within(root).getByText(/path is todos\$/i);
      const path = within(todos).getByText(/path is completed\$/i);
      within(path).getByText(/element is page completed/i);
    });

    test('todo/new', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todo = within(root).getByText(/path is todo\$/i);
      const path = within(todo).getByText(/path is new\$/i);
      within(path).getByText(/element is page add new task/i);
    });

    test('todo/edit/:id', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todo = within(root).getByText(/path is todo\$/i);
      const edit = within(todo).getByText(/path is edit\$/i);
      const path = within(edit).getByText(/path is :id\$/i);
      within(path).getByText(/element is page edit task/i);
    });
  });

  describe('page not found', () => {
    test('route todos/ is configured', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todos = within(root).getByText(/path is todos\$/i);
      const path = within(todos).getByText(/path is empty\$/i);
      within(path).getByText(/element is page not found/i);
      within(path).getByText(/route is index/i);
    });

    test('route todo/ is configured', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todo = within(root).getByText(/path is todo\$/i);
      const paths = within(todo).getAllByText(/path is empty\$/i);
      expect(paths).toHaveLength(2);
      within(paths[1]).getByText(/element is page not found/i);
      within(paths[1]).getByText(/route is index/i);
    });

    test('route todo/edit/ is configured', () => {
      const root = screen.getByText(/path is \/\$/i);
      const todo = within(root).getByText(/path is todo\$/i);
      const edit = within(todo).getByText(/path is edit\$/i);
      const path = within(edit).getByText(/path is empty\$/i);
      within(path).getByText(/element is page not found/i);
      within(path).getByText(/route is index/i);
    });

    test('route / is configured and is wildcard', () => {
      const routes = screen.getByText(/routes/i);
      const path = within(routes).getByText(/path is \*\$/i);
      within(path).getByText(/element is page not found/i);
    });
  });

  test('route / is redirected to todos/my-tasks', () => {
    screen.getByText(/element is redirect/i);
    screen.getByText(/redirect from is \/\$/i);
    screen.getByText(/redirect to is \/todos\/my\-tasks/i);
  });

  test('no unnecessary route is configured', () => {
    const elements = screen.getAllByText(/route not configured/i);
    expect(elements).toHaveLength(3);
  });
});
