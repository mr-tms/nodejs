import express from 'express';
import routes from './routes/index';
import AppError from './utils/appError';
import globalErrorHandler from './utils/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/v1', routes);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
