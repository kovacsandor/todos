import axios from 'axios';
import { createUrl } from 'src/helper';
import { CompleteTask, replaceParams } from 'todos-shared';

export const completeTask = async (taskId: string): Promise<CompleteTask['response']> => {
  const method: CompleteTask['method'] = 'put';
  const path: CompleteTask['path'] = '/api/task-service/complete/:taskId';
  const params: CompleteTask['params'] = { taskId };
  const url = replaceParams(createUrl(path), params);

  const { data } = await axios[method]<CompleteTask['response']>(url);

  return data;
};
