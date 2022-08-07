import axios, { AxiosResponse } from 'axios';
import { createUrl } from 'src/helper';
import { Login } from 'todos-shared';

export const logIn = async ({ email, password }: Login['requestBody']): Promise<Login['response']> => {
  const method: Login['method'] = 'post';
  const path: Login['path'] = '/api/login';
  const url = createUrl(path);
  const { data } = await axios[method]<Login['response'], AxiosResponse<Login['response']>, Login['requestBody']>(url, {
    email,
    password,
  });

  return data;
};
