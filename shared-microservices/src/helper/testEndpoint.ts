import { Express } from 'express';
import { IncomingHttpHeaders } from 'http';
import { SupertestResponse } from 'src/type';
import { agent } from 'supertest';
import { Endpoint, replaceParams } from 'todos-shared';

export const testEndpoint = async <
  T extends Endpoint<
    'post' | 'get' | 'put' | 'delete' | 'patch',
    Record<string, string>,
    string,
    Record<string, any>,
    Record<string, any>
  >,
>(
  app: Express,
  { method, params, path, requestBody }: Pick<T, 'method' | 'path'> & Partial<Pick<T, 'params' | 'requestBody'>>,
  headers?: IncomingHttpHeaders,
): Promise<SupertestResponse<T['response']>> => {
  const pathWithParams = replaceParams(path, params);
  return await agent(app)
    [method](pathWithParams)
    .set(headers || {})
    .send(requestBody);
};
