import express from 'express';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const userRouter = express.Router();

userRouter.get('/', catchAsync (
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { page = 1, limit = 10 } = req.query;
  const users = await User
    .find()
    .limit(Number(limit) * 1)
    .skip((Number(page) - 1) * Number(limit)).exec();
  
  if (users.length === 0) {
    return next(new AppError('No users were found', 404));
  }
  
  const count = await User.countDocuments().exec();
  res
    .status(200)
    .append('X-Total-Count', `${count}`)
    .json(users);
  }
));

userRouter.post('/', catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const newUser = await User.create(req.body);
  
  if (!newUser) {
    return next(new AppError('Failed to create a user', 400));
  }

  res
  .status(201)
  .append('Location', `/api/v1/users/${newUser._id}`)
  .end();
  }
));

userRouter.get('/:userId', catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.userId;
  const user = await User.findById(userId).exec();
  
  if (!user) {
    return next(new AppError(`No user was found with id ${userId}`, 404));
  }

  res.status(200).json(user);
  })
);

userRouter.delete('/:userId', catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId).exec();

  if (!user) {
    return next(new AppError(`No user was found with id ${userId}`, 404));
  }
  
  res.sendStatus(204);
  })
);

export default userRouter;
