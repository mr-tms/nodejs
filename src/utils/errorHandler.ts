import { Request, Response, NextFunction } from 'express';

const sendError = (
  error: NodeJS.ErrnoException,
  res: Response
  ) => {
    return res.status(error.errno || 500).json({
      status: error.code,
      error,
      message: error.message,
      stack: error.stack
    });
};

const globalHandler = (
  error: NodeJS.ErrnoException,
  _req: Request,
  res: Response,
  _next: NextFunction): Response | void => {
  
  sendError(error, res);
};

export default globalHandler;