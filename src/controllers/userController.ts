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

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const newUser = await User.create(req.body);
  
  try {
    res
      .append('Content-Location', `/api/v1/users/${newUser._id}`)
      .status(201)
      .end();
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  
  try {
    await User.findByIdAndDelete(userId);
    res.status(204).json({ message: 'User has been deleted.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
