import { ServerResponse, ServerResponseValidationError } from 'src/type';

export type ServerResponseValidation<T extends Record<string, any>, U extends Record<string, any>> =
  | ServerResponse<T>
  | ServerResponseValidationError<U>;
