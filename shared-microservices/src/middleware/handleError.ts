import { NextFunction, Request, Response } from 'express';
import { CustomValidationError, HttpError } from 'src/error';
import { ServerResponseHttpError, ServerResponseValidationError, StatusCode, Validation } from 'todos-shared';
import { ValidationError } from 'yup';

export const handleError = <T>(
  err: Error,
  req: Request,
  res: Response<ServerResponseHttpError | ServerResponseValidationError<T>>,
  next: NextFunction,
): void => {
  console.error(err);

  if (err instanceof HttpError) {
    return handleHttpError(err, req, res, next);
  }

  if (err instanceof CustomValidationError) {
    return handleCustomValidationError(err, req, res, next);
  }

  if (err instanceof ValidationError) {
    return handleValidationError(err, req, res, next);
  }

  res.status(StatusCode.InternalServerError).send({
    message: 'An unexpected error has occurred',
    type: 'HttpError',
  });
};

const handleHttpError = (
  err: HttpError,
  req: Request,
  res: Response<ServerResponseHttpError>,
  next: NextFunction,
): void => {
  res.status(err.statusCode).send({
    message: err.message,
    type: 'HttpError',
  });
};

const handleCustomValidationError = <T>(
  err: CustomValidationError<T>,
  req: Request,
  res: Response<ServerResponseValidationError<T>>,
  next: NextFunction,
): void => {
  res.status(err.statusCode).send({
    message: err.message,
    type: 'ValidationError',
    validation: getValidation(err),
  });
};

const handleValidationError = <T>(
  err: ValidationError,
  req: Request,
  res: Response<ServerResponseValidationError<T>>,
  next: NextFunction,
): void => {
  res.status(StatusCode.UnprocessableEntity).send({
    message: err.message,
    type: 'ValidationError',
    validation: getValidation(err),
  });
};

function getValidation<T>(err: ValidationError): Validation<T> {
  return err.inner.reduce((acc: Validation<T>, curr: ValidationError): Validation<T> => {
    if (curr.path && acc[curr.path]) {
      return {
        ...acc,
        [curr.path]: [...acc[curr.path], curr.message],
      };
    }

    if (curr.path) {
      return {
        ...acc,
        [curr.path]: [curr.message],
      };
    }

    return acc;
  }, {});
}
