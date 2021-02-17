import { NextFunction } from 'express';

export const badRequestError = (error: NodeJS.ErrnoException, next: NextFunction): void => {
  error.errno = 400;
  next(error);
};

export const notFoundError = (error: NodeJS.ErrnoException, next: NextFunction): void => {
  error.errno = 404;
  next(error);
};
