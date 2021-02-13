import express from 'express';
import usersRouter from './usersRouter';

const routes = express.Router();

routes.use('/users', usersRouter);

export default routes;
