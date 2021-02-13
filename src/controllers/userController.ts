import { Request, Response } from 'express';
import User from '../models/userModel';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: { users }
  });
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
};
