import { ServerResponseHttpError } from 'src/type';

export type ServerResponse<T extends Record<string, any>> = ServerResponseHttpError | ServerResponseSuccess<T>;

type ServerResponseSuccess<T> = {
  readonly payload: T;
  readonly type: 'Success';
};
