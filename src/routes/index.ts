import express from 'express';
import userRouter from './userRouter';

const routes = express.Router();

routes.use('/users', userRouter);

export default routes;
