import { Request, Response } from 'express';
import User from '../models/userModel';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10 } = req.query;
  
  try {
    const users = await User.find()
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();
    
    const count = await User.countDocuments()
      .exec();
    
    res.status(200).json({
      users,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: page
    });
  } catch (error) {
    res.json(error.message);
  }
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
