import axios from 'axios';
import { createUrl } from 'src/helper';
import { GetCompletedTasks, GetCompletedTasksPayload, replaceParams } from 'todos-shared';

export const fetchCompletedTasks = async (from: number): Promise<GetCompletedTasksPayload['tasks']> => {
  const method: GetCompletedTasks['method'] = 'get';
  const path: GetCompletedTasks['path'] = '/api/task-service/completed-tasks/:from';
  const params: GetCompletedTasks['params'] = { from: String(from) };
  const url = replaceParams(createUrl(path), params);

  const { data } = await axios[method]<GetCompletedTasks['response']>(url);

  if (data.type === 'Success') {
    return data.payload.tasks;
  }

  throw new Error('Invalid case');
};
