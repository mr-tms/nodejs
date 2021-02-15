import { Request, Response } from 'express';
import User from '../models/userModel';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await User.find();

  res.status(200).json({
    data: users
  });
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res
      .append('Content-Location', `/api/v1/users/${newUser._id}`)
      .status(201)
      .end();
  } catch (error) {
    res.json(error.message);
  }
};
