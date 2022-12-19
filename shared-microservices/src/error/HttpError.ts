import { StatusCode } from 'todos-shared';

export class HttpError extends Error {
  constructor(public readonly statusCode: StatusCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
