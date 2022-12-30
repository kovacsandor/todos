import { ServerResponseHttpError, ServerResponseValidation } from 'src/type';

export type ServerResponse<T extends Record<string, any>> = ServerResponseHttpError | ServerResponseSuccess<T>;

type ServerResponseSuccess<T> = {
  readonly payload: T;
  readonly type: 'Success';
};

export const extract = <T extends Record<string, any>, U extends Record<string, any>>(
  response: ServerResponseValidation<T, U>,
): T | null => {
  return response.type === 'Success' ? response.payload : null;
};
