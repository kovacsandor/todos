import axios, { AxiosResponse } from 'axios';
import { createUrl } from 'src/helper';
import { CreateTask } from 'todos-shared';

export const createTask = async ({
  description,
  dueDate,
  summary,
  type,
}: CreateTask['requestBody']): Promise<CreateTask['response']> => {
  const method: CreateTask['method'] = 'post';
  const path: CreateTask['path'] = '/api/task-service/create';
  const url = createUrl(path);

  const { data } = await axios[method]<
    CreateTask['response'],
    AxiosResponse<CreateTask['response']>,
    CreateTask['requestBody']
  >(url, {
    description,
    dueDate,
    summary,
    type,
  });

  return data;
};
