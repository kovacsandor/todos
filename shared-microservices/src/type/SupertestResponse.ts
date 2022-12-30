import { Response } from 'supertest';

export type SupertestResponse<T> = Omit<Response, 'body'> & { readonly body: T };
