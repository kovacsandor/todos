import { Validation } from 'src/type';

export type ServerResponseValidationError<T extends Record<string, any>> = {
  readonly message: string;
  readonly type: 'ValidationError';
  readonly validation: Validation<T>;
};
