import { ListItemProps, ListItemTextProps } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import { Task } from 'src/component/task';
import { ITaskAvatarProps } from 'src/component/task/ITaskAvatarProps';
import Shared from 'todos-shared';

type MockMoment = { readonly format: (formatString: string) => string };
const mockFormat = jest.fn<string, [string]>();
const mockMoment = jest.fn<MockMoment, [number]>();

jest.mock('src/component/task/TaskAvatar', () => ({
  TaskAvatar: ({ type }: ITaskAvatarProps) => (
    <div>
      TaskAvatar
      <div>type is {type}</div>
    </div>
  ),
}));

jest.mock('@mui/material/ListItem', () => ({ children, disablePadding }: ListItemProps) => (
  <div>
    ListItem
    <div>{children}</div>
    {disablePadding && <div>disablePadding</div>}
  </div>
));

jest.mock('@mui/material/ListItemText', () => ({ primary, secondary }: ListItemTextProps) => (
  <div>
    ListItemText
    <div>primary is {primary}</div>
    <div>secondary is {secondary}</div>
  </div>
));

jest.mock(
  'moment',
  () =>
    (timestamp: number): MockMoment =>
      mockMoment(timestamp),
);

describe('Task', () => {
  const task: Pick<Shared.Task, 'type' | 'summary' | 'id' | 'dueDate' | 'status'> = {
    dueDate: new Date(),
    id: 'id',
    status: 'todo',
    summary: 'summary',
    type: 'private',
  };
  beforeEach(() => {
    mockFormat.mockReturnValueOnce('formatted');
    mockMoment.mockReturnValueOnce({ format: (formatString: string) => mockFormat(formatString) });
    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <Task task={task} />
      </QueryClientProvider>,
    );
  });

  test('structure is correct', () => {
    const listItem = screen.getByText(/^ListItem$/i);
    within(listItem).getByText(/TaskAvatar/i);
    within(listItem).getByText(/ListItemText/i);
  });

  test('list item is configured correctly', () => {
    screen.getByText(/disablePadding/i);
  });

  test('avatar is configured correctly', () => {
    screen.getByText(/type is private/i);
  });

  test('item text is configured correctly', () => {
    screen.getByText(/primary is summary/i);
    screen.getByText(/secondary is formatted/i);
  });
});
