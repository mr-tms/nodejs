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

export default ((
  error: NodeJS.ErrnoException,
  _req: Request,
  res: Response,
  _next: NextFunction): Response | void => {
  
  error.name = error.name || 'error'; 

  sendError(error, res);
});
