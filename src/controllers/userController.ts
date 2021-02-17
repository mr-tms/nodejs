import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { badRequestError } from '../utils/errors';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { page = 1, limit = 10 } = req.query;

  const users = await User
    .find()
    .limit(Number(limit) * 1)
    .skip((Number(page) - 1) * Number(limit))
    .catch(error => badRequestError(error, next));
  
  const count = await User.countDocuments().exec();
  
  res.status(200).json({
    users,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: page
  });
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.userId;
  const user = await User
    .findById(userId)
    .catch(error => badRequestError(error, next));
  
  if (user !== null) res.status(200).json({ user });
  next();
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const newUser = await User
    .create(req.body)
    .catch(error => badRequestError(error, next));
  
  if (newUser) {
    res
      .status(201)
      .append('Location', `/api/v1/users/${newUser._id}`)
      .end();
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.userId;
  await User
    .findByIdAndDelete(userId)
    .catch(error => badRequestError(error, next));
  
  res.status(204).json({ message: 'User has been deleted.'});
};

//https://www.robinwieruch.de/node-express-error-handling
//https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
