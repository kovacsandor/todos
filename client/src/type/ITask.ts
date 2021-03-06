export interface ITask {
  readonly createdOn: number;
  readonly dueDate: number;
  readonly id: string;
  readonly status: 'completed' | 'todo';
  readonly summary: string;
  readonly type: 'private' | 'work';
}
