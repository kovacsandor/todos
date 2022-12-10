import axios from 'axios';
import { createUrl, replaceParams } from 'src/helper';
import { GetMyTasks, GetMyTasksPayload } from 'todos-shared';

export const fetchMyTasks = async (from: number): Promise<GetMyTasksPayload['tasks']> => {
  const method: GetMyTasks['method'] = 'get';
  const path: GetMyTasks['path'] = '/api/todos/my-tasks/:from';
  const params: GetMyTasks['params'] = { from: String(from) };
  const url = replaceParams(createUrl(path), params);

  const { data } = await axios[method]<GetMyTasks['response']>(url);

  if (data.type === 'Success') {
    return data.payload.tasks;
  }

  throw new Error('Invalid case');
};
