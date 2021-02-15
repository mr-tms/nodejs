import express from 'express';
import {
  createUser,
  getAllUsers,
  getUser,
  deleteUser
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:userId').get(getUser).delete(deleteUser);

export default userRouter;
