import { StatusCode } from 'todos-shared';
import { ValidationError } from 'yup';

export class CustomValidationError<T> extends Error {
  public readonly inner: ValidationError['inner'];
  constructor(public readonly statusCode: StatusCode, message: string, value: T, field: string) {
    super(message);
    const error = new ValidationError(message, value, field);
    this.inner = [error];
    Object.setPrototypeOf(this, CustomValidationError.prototype);
  }
}
