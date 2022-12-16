export interface Task {
  readonly createdOn: number;
  readonly description: string;
  readonly dueDate: number;
  readonly id: string;
  readonly owner: string;
  readonly status: 'completed' | 'todo';
  readonly summary: string;
  readonly type: 'private' | 'work';
}
