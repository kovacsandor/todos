export interface Task {
  readonly createdOn: Date;
  readonly description: string;
  readonly dueDate: Date;
  readonly id: string;
  readonly owner: string;
  readonly status: 'completed' | 'todo';
  readonly summary: string;
  readonly type: 'private' | 'work';
}
