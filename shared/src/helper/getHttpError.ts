import { ServerResponseHttpError, ServerResponseValidation } from 'src/type';

export const getHttpError = <T extends Record<string, any>, U extends Record<string, any>>(
  response: ServerResponseValidation<T, U>,
): ServerResponseHttpError | null => {
  return response.type === 'HttpError' ? response : null;
};
