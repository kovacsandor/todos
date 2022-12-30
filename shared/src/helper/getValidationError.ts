import { ServerResponseValidation, ServerResponseValidationError } from 'src/type';

export const getValidationError = <T extends Record<string, any>, U extends Record<string, any>>(
  response: ServerResponseValidation<T, U>,
): ServerResponseValidationError<U> | null => {
  return response.type === 'ValidationError' ? response : null;
};
