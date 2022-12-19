import { StatusCode } from 'todos-shared';
import { ValidationError } from 'yup';

export class CustomValidationError<T> extends ValidationError {
  constructor(public readonly statusCode: StatusCode, message: string, value: T, field: string) {
    const error = new ValidationError(message, value, field);
    super([error]);
    Object.setPrototypeOf(this, CustomValidationError.prototype);
  }
}
