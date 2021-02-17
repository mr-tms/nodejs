import express from 'express';
import { Request, Response, NextFunction } from 'express';
import routes from './routes/index';
import { notFoundError } from './utils/errors';

const app = express();

app.use(express.json());
app.use('/api/v1', routes);

app.get('*', (req, _res, next) => {
  const error: NodeJS.ErrnoException = new Error(
    `It seems ${req.originalUrl} does not exist here!`
  );
  // error.errno = 404;
  // next(error);
  notFoundError(error, next);
});

app.use((error: NodeJS.ErrnoException, _req: Request, res: Response, next: NextFunction) => {
  if (!error.errno) error.errno = 500;
  if (error.errno === 404) {
    res.status(404); //.redirect('/404');
    next();
  }

  return res
    .status(error.errno)
    .json({ error: error.toString() });
});

export default app;
