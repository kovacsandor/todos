import { render, screen } from '@testing-library/react';
import { MomentInput } from 'moment';
import { TaskListDivider } from 'src/component/task-list/TaskListDivider';
import { ITask } from 'src/type';

const mockFormat = jest.fn();
const mockMonth = jest.fn();
const mockYear = jest.fn();

jest.mock('@mui/material/Divider', () => () => <div>Divider</div>);

jest.mock('moment', () => (input: MomentInput) => ({
  format: (format?: string) => mockFormat(format),
  month: () => mockMonth(),
  year: () => mockYear(),
}));

describe('TaskListDivider', () => {
  const curr: Omit<ITask, 'createdOn'> = {
    dueDate: 123456,
    id: 'id2',
    status: 'todo',
    summary: 'summary2',
    type: 'private',
  };

  describe('curr is first item in the list', () => {
    const prev: Omit<ITask, 'createdOn'> | undefined = undefined;

    beforeEach(() => {
      mockMonth.mockReturnValue('january');
      mockYear.mockReturnValue('2022');
      mockFormat.mockReturnValue('format');
      render(<TaskListDivider curr={curr} prev={prev} />);
    });

    test('divider is not visible', () => {
      const divider = screen.queryByText(/divider/i);
      expect(divider).toBeNull();
    });
  });

  describe('curr is not the first item in the list', () => {
    const prev: Omit<ITask, 'createdOn'> | undefined = {
      dueDate: 123456,
      id: 'id1',
      status: 'todo',
      summary: 'summary1',
      type: 'private',
    };

    describe('curr and prev are in the same month', () => {
      beforeEach(() => {
        mockMonth.mockReturnValue('january');
        mockYear.mockReturnValue('2022');
        mockFormat.mockReturnValue('format');
        render(<TaskListDivider curr={curr} prev={prev} />);
      });

      test('divider is not visible', () => {
        const divider = screen.queryByText(/divider/i);
        expect(divider).toBeNull();
      });
    });

    describe('curr and prev are NOT in the same month', () => {
      beforeEach(() => {
        mockMonth.mockReturnValueOnce('january');
        mockMonth.mockReturnValueOnce('february');
        mockYear.mockReturnValue('2022');
        mockFormat.mockReturnValue('format');
        render(<TaskListDivider curr={curr} prev={prev} />);
      });

      test('divider is visible', () => {
        screen.getByText(/divider/i);
      });

      test('divider text is month', () => {
        expect(mockFormat).toBeCalledWith('MMMM');
      });
    });

    describe('curr and prev are NOT in the same year', () => {
      beforeEach(() => {
        mockMonth.mockReturnValueOnce('december');
        mockMonth.mockReturnValueOnce('january');
        mockYear.mockReturnValueOnce('2022');
        mockYear.mockReturnValueOnce('2023');
        mockFormat.mockReturnValue('format');
        render(<TaskListDivider curr={curr} prev={prev} />);
      });

      test('divider is visible', () => {
        screen.getByText(/divider/i);
      });

      test('divider text is year', () => {
        expect(mockFormat).toBeCalledWith('YYYY');
      });
    });
  });
});
